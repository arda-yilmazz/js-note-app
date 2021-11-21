const noteContainer = document.querySelector('.notes ul')
let notes = document.querySelectorAll('.notes ul li');

let notesArray = [];

const toggleNotes = () => {
    [...notes].map(note => note.addEventListener('click', e => {

        notes.forEach(note => note.classList.remove('active'))

        const title = e.currentTarget.querySelector('.note-title').innerHTML;
        const content = e.currentTarget.querySelector('.note-content').innerHTML;

        document.querySelector('input.title').value = title;
        document.querySelector('textarea.description').value = content;

        e.currentTarget.classList.add('active');
        e.preventDefault();
    }))
}

const listNotes = () => notesArray.map(note => createNote(note));

const createNote = note => {
    const li = document.createElement('li');
    li.innerHTML = `
        <a href="#" class="note">
        <span class="note-title">${note.title}</span>
        <span class="note-content">${note.description}</span>
        <span class="note-date">${note.date}</span>
    </a>
    `;
    noteContainer.appendChild(li);

    notesArray = [...notesArray, note];
    notes = [...notes, li];
    localStorage.setItem('notes', JSON.stringify(notesArray));

    toggleNotes();

    return note;
}

document.querySelector('button').addEventListener('click', () => {
    return createNote({
        title: document.querySelector('input.title').value,
        description: document.querySelector('textarea.description').value,
        date: new Date().toLocaleDateString()
    })
})

if (localStorage.getItem('notes')) {
    JSON.parse(localStorage.getItem('notes')).map(note => createNote(note));
}