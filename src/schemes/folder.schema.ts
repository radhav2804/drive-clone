import { create } from 'domain';
import {z} from 'zod';

export const createFolderSchema = z.object({
    name : z.string().min(1, "Folder name must be at least 1 character long"),
    parentId : z.number().int().positive().optional(),
});

export const renameFolderSchema = z.object({
    name:z.string().min(1, "Folder name must be at least 1 character long"),
});

export type createFolderInput = z.infer<typeof createFolderSchema>;
export type renameFolderInput = z.infer<typeof renameFolderSchema>;