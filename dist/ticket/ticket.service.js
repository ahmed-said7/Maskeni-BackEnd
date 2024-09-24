"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ticket_schema_1 = require("./ticket.schema");
const api_service_1 = require("../common/Api/api.service");
const QRCode = __importStar(require("qrcode"));
let TicketService = class TicketService {
    constructor(ticketModel, eventModel, apiService) {
        this.ticketModel = ticketModel;
        this.eventModel = eventModel;
        this.apiService = apiService;
    }
    async getTicket(ticketId) {
        const ticketExists = await this.ticketModel
            .findById(ticketId)
            .populate({ path: 'user', select: 'name mobile icon', model: 'User' })
            .populate({
            path: 'eventOwner',
            select: 'name mobile icon',
            model: 'User',
        })
            .populate({
            path: 'event',
            select: 'name details images type',
            model: Event.name,
        });
        if (!ticketExists) {
            throw new common_1.HttpException('ticket not found', 400);
        }
        return { ticket: ticketExists };
    }
    async getTickets(obj, user) {
        const filter = { $or: [{ eventOwner: user }, { user }] };
        const { query, paginationObj } = await this.apiService.getAllDocs(this.ticketModel.find(), obj, filter);
        const posts = await query
            .populate({ path: 'user', select: 'name mobile icon', model: 'User' })
            .populate({
            path: 'eventOwner',
            select: 'name mobile icon',
            model: 'User',
        })
            .populate({
            path: 'event',
            select: 'name details images type',
            model: Event.name,
        });
        return { posts, pagination: paginationObj };
    }
    async createTicket(eventId, quantity, user) {
        const event = await this.eventModel.findById(eventId);
        if (!event) {
            throw new common_1.HttpException('event not found', 400);
        }
        const ticket = await this.ticketModel.create({
            price: event.price,
            user: user,
            eventOwner: event.user.toString(),
            event: event._id.toString(),
            isPaid: false,
            quantity,
        });
        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({
            ticketId: ticket._id.toString(),
            user,
            expiresAt: new Date(event.endedAt.getTime() + 3600 * 3000),
        }));
        ticket.qrCode = qrCodeUrl;
        await ticket.save();
        return { ticket };
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ticket_schema_1.Ticket.name)),
    __param(1, (0, mongoose_1.InjectModel)(Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        api_service_1.ApiService])
], TicketService);
//# sourceMappingURL=ticket.service.js.map