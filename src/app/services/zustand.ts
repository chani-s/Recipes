// stores/useObjectIdStore.ts
import {create} from 'zustand';
import { ObjectId } from 'mongodb';

type ObjectIdStore = {
    objectIds: ObjectId[];
    setObjectIds: (ids: ObjectId[]) => void; 
};

export const useObjectIdStore = create<ObjectIdStore>((set) => ({
    objectIds: [],

    setObjectIds: (ids: ObjectId[]): void => set({ objectIds: ids }),
}));
