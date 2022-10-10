import { Router, Request } from "express";

import { postComment, deleteComment, updateComment } from "../db/queries";

const router = Router();

router
    .route("/comments/:id")
    .post(async (req: Request<{ id: string }, any, { comment: string }>, res) => {
        const { id } = req.params;
        const { comment } = req.body;

        try {
            const comments = await postComment(id, comment);
            res.json(comments);
        } catch (error) {
            res.send(error);
        }
    })
    .put(async (req: Request<{ id: string }, any, { comment: string }>, res) => {
        const { id } = req.params;
        const { comment } = req.body;

        try {
            const updatedComment = await updateComment(id, comment);
            res.json(updatedComment);
        } catch (error) {
            res.send(error);
        }
    })
    .delete(async (req: Request<{ id: string }>, res) => {
        const { id } = req.params;
        try {
            const deletedComment = await deleteComment(id);
            res.json(deletedComment);
        } catch (error) {
            res.send(error);
        }
    });

export default router;
