import { z } from 'zod';
export declare const createFolderSchema: z.ZodObject<{
    name: z.ZodString;
    parentId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const renameFolderSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type createFolderInput = z.infer<typeof createFolderSchema>;
export type renameFolderInput = z.infer<typeof renameFolderSchema>;
//# sourceMappingURL=folder.schema.d.ts.map