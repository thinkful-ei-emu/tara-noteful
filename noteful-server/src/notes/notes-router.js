const path = require('path');
const express = require('express');
const xss = require('xss');
const NotesService = require('./notes-service');

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNote = note => ({
  id: note.id,
  name: xss(note.name), // sanitize name
  content: xss(note.content), // sanitize content
  modified: note.modified,
  folder_id: note.folder_id
});

notesRouter
  .route('/')
  .get((req, res, next) => {
    const db = req.app.get('db');
    NotesService.getAllNotes(db)
      .then(notes => {
        res.json(notes);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name, content, folder_id} = req.body;
    const newNote = { name, content, folder_id: Number(folder_id) };

    for (const [key, value] of Object.entries(newNote)) {
      // eslint-disable-next-line eqeqeq
      if (!value) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
      }
    }

    NotesService.insertNote(req.app.get('db'), newNote)
      .then(note => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          .json(note);
      })
      .catch(next);
  });

notesRouter
  .route('/:note_id')
  .all((req, res, next) => {
    NotesService.getById(req.app.get('db'), req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: 'Note doesn\'t exist' }
          });
        }
        res.note = note; // save the note for the next middleware
        next(); // don't forget to call next so the next middleware happens!
      })
      .catch(next);
  })
  // eslint-disable-next-line no-unused-vars
  .get((req, res, next) => {
    res.json(serializeNote(res.note));
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(req.app.get('db'), req.params.note_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, content, folder_id } = req.body;
    const noteToUpdate = { name, content, folder_id };

    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: 'Request body must contain either \'name\', \'style\', or \'content\''
        }
      });
    }

    NotesService.updateNote(
      req.app.get('db'),
      req.params.note_id,
      noteToUpdate
    )
      // eslint-disable-next-line no-unused-vars
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = notesRouter;
