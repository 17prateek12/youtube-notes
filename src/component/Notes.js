import React, { useState, useEffect } from 'react';

const Notes = ({ videoId, player }) => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [editingNoteIndex, setEditingNoteIndex] = useState(null);
    const [editingNoteContent, setEditingNoteContent] = useState('');

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
        setNotes(savedNotes);
    }, [videoId]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(0);
        date.setSeconds(timestamp);
        return date.toISOString().substr(11, 8);
    };

    const addNote = () => {
        const newNote = {
            timestamp: player.getCurrentTime(),
            date: new Date().toLocaleString(),
            content: currentNote,
        };
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        localStorage.setItem(videoId, JSON.stringify(updatedNotes));
        setCurrentNote('');
    };

    const deleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
        localStorage.setItem(videoId, JSON.stringify(updatedNotes));
    };

    const startEditingNote = (index) => {
        setEditingNoteIndex(index);
        setEditingNoteContent(notes[index].content);
    };

    const saveEditedNote = () => {
        const updatedNotes = notes.map((note, index) =>
            index === editingNoteIndex ? { ...note, content: editingNoteContent } : note
        );
        setNotes(updatedNotes);
        localStorage.setItem(videoId, JSON.stringify(updatedNotes));
        setEditingNoteIndex(null);
        setEditingNoteContent('');
    };

    const cancelEditingNote = () => {
        setEditingNoteIndex(null);
        setEditingNoteContent('');
    };

    const jumpToTimestamp = (timestamp) => {
        player.seekTo(timestamp);
    };

    return (
        <div className='mt-12'>
            <p className='text-xl font-semibold ml-12'>My notes</p>
            <p className='text-sm ml-12 mb-4'>All your notes at a single place. Click on any note to go to specific timestamp in the video.</p>
            <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Add a note"
                className='w-[90%] focus:outline-none border border-gray-300 mx-12 py-3 px-4 rounded-xl'
            />
            <button className='bg-blue-500 w-[100px] h-[40px] flex justify-center items-center 
      text-white rounded-2xl hover:bg-blue-400 mt-4 ml-12'
                onClick={addNote}>Add Note</button>
            <ul className='mx-12 my-8'>
                {notes.map((note, index) => (
                    <li key={index} className='my-4'>
                        <p onClick={() => jumpToTimestamp(note.timestamp)}
                            className='text-sm font-semibold'
                        >
                            [{formatTimestamp(note.timestamp)}] {note.date}
                        </p>
                        {editingNoteIndex === index ? (
                            <div>
                                <textarea
                                    value={editingNoteContent}
                                    onChange={(e) => setEditingNoteContent(e.target.value)}
                                    className='w-[90%] focus:outline-none border border-gray-300 mx-12 py-3 px-4 rounded-xl'
                                />
                                <div className='flex items-center'>
                                    <button className='bg-gray-500 w-[80px] h-[30px] flex justify-center items-center 
                                                        text-white rounded-2xl hover:bg-gray-400 mt-4'
                                        onClick={saveEditedNote}>Save
                                    </button>
                                    <button className='bg-gray-500 w-[80px] h-[30px] flex justify-center items-center 
                                                       text-white rounded-2xl hover:bg-gray-400 mt-4 ml-4'
                                        onClick={cancelEditingNote}>Cancel
                                    </button>
                                </div>

                            </div>
                        ) : (
                            <div>
                                <p  >{note.content}</p>
                                <div className='flex items-center gap-4 mt-2'>
                                <button onClick={() => startEditingNote(index)}
                                className='bg-blue-500 w-[60px] h-[30px] flex justify-center items-center 
                                text-white rounded-2xl hover:bg-blue-400'
                                >Edit
                                </button>
                                <button onClick={() => deleteNote(index)}
                                className='bg-blue-500 w-[60px] h-[30px] flex justify-center items-center 
                                text-white rounded-2xl hover:bg-blue-400'
                                >Delete
                                </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
