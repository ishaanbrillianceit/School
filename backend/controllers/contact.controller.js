import Contact from "../models/Contact.model.js";

export const createContact = async (req, res) => {
  console.log("This is the Contact Controller to add contact details");
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      phone,
      message,
    });

    await newContact.save();

    return res
      .status(201)
      .json({ message: "Thank You! We will contact you ASAP", newContact });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

export const getContacts = async (req, res) => {
  try {
    console.log("Fetching Contact");
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "Contacts not found!" });
    }

    return res
      .status(200)
      .json({ message: "Contacts fetched successfully!", contacts });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error`, error });
  }
};

export const getDetailContact = async (req, res) => {
  const { id } = req.params;
  // lookup and return contact, e.g.:
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    return res.status(200).json({ contact });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  try {
    const { body } = req;
    const updated = await Contact.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Contact not found" });

    return res
      .status(200)
      .json({ message: "Contact updated successfully!", updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteContact = await Contact.findByIdAndDelete(id);
    console.log("This is the deleteContact: ", deleteContact);

    return res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
