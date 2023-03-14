import { ISegmentStore } from '../../lib/types/stores/segment-store';
import { IFeatureStrategySegment, ISegment } from '../../lib/types/model';
import { IUser } from 'lib/server-impl';

export default class FakeSegmentStore implements ISegmentStore {
    segments: ISegment[] = [];

    count(): Promise<number> {
        return Promise.resolve(this.segments.length);
    }

    create(
        data: Omit<ISegment, 'id'>,
        user: Partial<Pick<IUser, 'username' | 'email'>>,
    ): Promise<ISegment> {
        const segment = {
            ...data,
            id: this.segments.length + 1,
            createdBy: user.email || user.username,
        } as ISegment;
        this.segments.push(segment);
        return Promise.resolve(segment);
    }

    async delete(): Promise<void> {
        return;
    }

    async deleteAll(): Promise<void> {
        this.segments = [];
        return;
    }

    async exists(): Promise<boolean> {
        return false;
    }

    get(): Promise<ISegment> {
        throw new Error('Method not implemented.');
    }

    async getAll(): Promise<ISegment[]> {
        return Promise.resolve(this.segments);
    }

    async getActive(): Promise<ISegment[]> {
        return Promise.resolve(this.segments);
    }

    async getByStrategy(): Promise<ISegment[]> {
        return [];
    }

    update(): Promise<ISegment> {
        throw new Error('Method not implemented.');
    }

    addToStrategy(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    removeFromStrategy(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async getAllFeatureStrategySegments(): Promise<IFeatureStrategySegment[]> {
        return [];
    }

    async existsByName(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    destroy(): void {}
}
