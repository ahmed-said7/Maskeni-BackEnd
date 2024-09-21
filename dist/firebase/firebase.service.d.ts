import * as admin from 'firebase-admin';
export declare class FirebaseService {
    private readonly firebaseApp;
    constructor(firebaseApp: admin.app.App);
    checkFirebaseToken(request: any): Promise<{
        email: string;
        uid: string;
        provider: string;
    }>;
    sendMessage({ token, title, body, refrence, type, }: {
        token?: string;
        title: string;
        body: string;
        refrence: string;
        type: string;
        user?: string;
    }): Promise<void>;
}
