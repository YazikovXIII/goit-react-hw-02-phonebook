// import React from 'react';
// import { nanoid } from 'nanoid';
// import { Wrapper } from './Wrapper/Wrapper.styled';
// import { Section } from './Section/Section.styled';

// const nameInputId = nanoid();
// const numberInputId = nanoid();
// const searchInputId = nanoid();

// export class App extends React.Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     const contact = {
//       id: nanoid(),
//       name: this.state.name,
//       number: this.state.number,
//     };
//     this.setState(
//       prevState => ({
//         contacts: [...prevState.contacts, contact],
//       }),
//       () => console.log(this.state.contacts)
//     );
//     this.setState({ name: '', number: '' });
//   };
//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onChangeFilter = e => {
//     this.setState({ filter: e.target.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const lowercasedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(lowercasedFilter)
//     );
//   };

//   render() {
//     const { name, number, contacts, filter } = this.state;
//     const isFormFilled = name && number;
//     const filteredContacts = this.getFilteredContacts();

//     return (
//       <Wrapper>
//         <Section>
//           <h1 className="form__title">Phone book</h1>
//           <form onSubmit={this.onSubmit} className="contact_add__form">
//             <label htmlFor={nameInputId}>Name</label>
//             <input
//               id={nameInputId}
//               className="form__input"
//               onChange={this.onChange}
//               value={name}
//               type="text"
//               name="name"
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//             />
//             <label htmlFor={numberInputId}>Number</label>
//             <input
//               id={numberInputId}
//               className="form__input"
//               onChange={this.onChange}
//               value={number}
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//             />
//             {isFormFilled ? (
//               <button className="form__button" type="submit">
//                 Add contact
//               </button>
//             ) : (
//               <p className="form__message">Fill the fields to Add contact</p>
//             )}
//           </form>
//         </Section>

//         {contacts.length > 0 && (
//           <Section>
//             <h2 className="contacts__list_title">Contacts</h2>
//             <label htmlFor={searchInputId}>Search contact</label>
//             <input
//               id={searchInputId}
//               type="text"
//               value={filter}
//               onChange={this.onChangeFilter}
//             />
//             <ul className="contacts__list">
//               {filteredContacts.map(contact => (
//                 <li key={contact.id} className="contacts__list_item">
//                   {contact.name}: {contact.number}
//                 </li>
//               ))}
//             </ul>
//           </Section>
//         )}
//       </Wrapper>
//     );
//   }
// }

import React from 'react';
import { Wrapper } from './Wrapper/Wrapper.styled';
import { Section } from './Section/Section.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowercasedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Wrapper>
        <Section>
          <h1 className="form__title">Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </Section>
        {filteredContacts.length > 0 && (
          <Section>
            <h2 className="contacts__list_title">Contacts</h2>
            <Filter value={filter} onChangeFilter={this.changeFilter} />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        )}
      </Wrapper>
    );
  }
}
