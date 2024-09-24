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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const admin = __importStar(require("firebase-admin"));
const config_1 = require("@nestjs/config");
const firebase_service_1 = require("./firebase.service");
let FirebaseModule = class FirebaseModule {
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [
            {
                provide: 'FIREBASE_ADMIN',
                useFactory: function (config) {
                    return admin.initializeApp({
                        credential: admin.credential.cert({
                            type: config.get('FIREBASE_TYPE'),
                            project_id: config.get('FIREBASE_PROJECT_ID'),
                            private_key_id: config.get('FIREBASE_PRIVATE_KEY_ID'),
                            private_key: config
                                .get('FIREBASE_PRIVATE_KEY')
                                .replace(/\\n/g, '\n'),
                            client_email: config.get('FIREBASE_CLIENT_EMAIL'),
                            client_id: config.get('FIREBASE_CLIENT_ID'),
                            auth_uri: config.get('FIREBASE_AUTH_URI'),
                            token_uri: config.get('FIREBASE_TOKEN_URI'),
                            auth_provider_x509_cert_url: config.get('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
                            client_x509_cert_url: config.get('FIREBASE_CLIENT_X509_CERT_URL'),
                            universe_domain: config.get('FIREBASE_UNIVERSE_DOMAIN'),
                        }),
                        databaseURL: config.get('Firebase_Url'),
                    });
                },
                inject: [config_1.ConfigService],
            },
            firebase_service_1.FirebaseService,
        ],
        imports: [],
        exports: [firebase_service_1.FirebaseService],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map