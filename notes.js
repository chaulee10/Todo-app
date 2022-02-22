const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)
    // const duplicateNotes = notes.filter(note => note.title === title)

    if(!duplicateNote) //duplicateNotes.length === 0
    {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log("New note added")
    }
    else{
        console.log("Note title taken")
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title) //return True

    saveNotes(notesToKeep)
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
    }
    else{
        console.log(chalk.red.inverse('No note found!'))
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e){
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.green('Your notes'))
    
    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => notes.title === title)

    if(note){
        console.log(chalk.bold.green(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red('No notes found'))
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote : removeNote,
    listNotes: listNotes,
    readNote: readNote
}