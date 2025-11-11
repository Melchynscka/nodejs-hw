import createHttpError from 'http-errors';
import { Note } from "../models/note.js";



export const getAllNotes = async (req, res) => {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const parseIntPage = parseInt(page);
    const parseIntPerPage = parseInt(perPage);

    const skip = (parseIntPage - 1) * parseIntPerPage;
    const notesQuery = Note.find({ userId: req.user._id });

    if (search) {
        notesQuery.where({
            $text: { $search: search }
        });
    }

    if (tag) {
        notesQuery.where("tag").equals(tag);
    }

    const [totalNotes, notes] = await Promise.all([
        notesQuery.clone().countDocuments(),
        notesQuery.skip(skip).limit(parseIntPerPage),
    ]);
    const totalPages = Math.ceil(totalNotes / parseIntPerPage);

    res.status(200).json({
        page: parseIntPage,
        perPage: parseIntPerPage,
        totalNotes,
        totalPages,
        notes,
    });
};

export const getNoteById = async (req, res, next) => {
    const { noteId } = req.params;
    const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id,
    });
    if (!note) {
        next(createHttpError(404,"Note not found"));
        return;
    }
    res.status(200).json(note);
};

export const createNote = async (req, res) => {
    const note = await Note.create({
        ...req.body, userId: req.user._id,
    });
    res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
    const { noteId } = req.params;
    const note = await Note.findByIdAndDelete({
        _id: noteId,
        userId: req.user._id,
    });
    if (!note) {
        next(createHttpError(404,"Note not found"));
        return;
    }
    res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
    const { noteId } = req.params;
    const note = await Note.findByIdAndUpdate(
        {_id: noteId, userId: req.user._id},
        req.body,
        { new: true },
    );
    if (!note) {
        next(createHttpError(404, "Note not found"));
        return;
    }
    res.status(200).json(note);
};