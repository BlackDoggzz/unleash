import { IUser } from 'lib/server-impl';
import { ISegment } from 'lib/types';
import { ISegmentService } from 'lib/segments/segment-service-interface';
import { UpsertSegmentSchema } from 'lib/openapi/spec/upsert-segment-schema';

export class SegmentServiceMock implements ISegmentService {
    segments: ISegment[] = [];

    strategies: { [key: string]: number[] } = {};

    updateStrategySegments(
        strategyId: string,
        segmentIds: number[],
    ): Promise<void> {
        this.strategies[strategyId] = segmentIds;
        return Promise.resolve();
    }

    addToStrategy(id: number, strategyId: string): Promise<void> {
        if (!this.strategies[strategyId]) {
            this.strategies[strategyId] = [];
        }
        this.strategies[strategyId].push(id);
        return Promise.resolve();
    }

    getByStrategy(strategyId: string): Promise<ISegment[]> {
        const segmentIds = this.strategies[strategyId] || [];
        console.log(this.strategies);
        return Promise.resolve(segmentIds.map((id) => this.segments[id - 1]));
    }

    getActive(): Promise<ISegment[]> {
        return Promise.resolve(this.segments);
    }

    getAll(): Promise<ISegment[]> {
        return Promise.resolve(this.segments);
    }

    create(
        data: UpsertSegmentSchema,
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
}
