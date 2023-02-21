import { IAuthRequest, IUser } from '../server-impl';

export function extractUsernameFromUser(user: IUser): string {
    if (user) {
        const candidate = user.email || user.username;
        if (candidate) {
            return candidate;
        }
    }
    return 'unknown';
}

export function extractUsername(req: IAuthRequest): string {
    return extractUsernameFromUser(req.user);
}
