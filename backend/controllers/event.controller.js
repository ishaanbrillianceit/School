import Event from "../models/Event.models.js";

export const createEvent = async (req, res) => {
  console.log("This is the Event Controller to add Event details");
  try {
    console.log("This is the res.body: ", req.body);
    const {
      title,
      description,
      shortDescription,
      eventDate,
      eventTime,
      location,
    } = req.body;

    if (
      !title ||
      !description ||
      !shortDescription ||
      !eventDate ||
      !eventTime ||
      !location
    ) {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    const date = new Date(`${eventDate}T${eventTime}`);

    const newEvent = new Event({
      title,
      description,
      date,
      shortDescription,
      location,
    });

    console.log("New Event: ", newEvent);

    await newEvent.save();

    return res
      .status(201)
      .json({ message: "Event added successfully", newEvent });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "Events not found!" });
    }

    return res
      .status(200)
      .json({ message: "Events fetched successfully!", events });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error`, error });
  }
};

export const getDetailEvent = async (req, res) => {
  const { id } = req.params;
  // lookup and return Event, e.g.:
  try {
    console.log("The get detail event is working");
    const event = await Event.findById(id);
    console.log(event);
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const { body } = req;
    const updated = await Event.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Event not found" });

    return res
      .status(200)
      .json({ message: "Event updated successfully!", updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteEvent = await Event.findByIdAndDelete(id);
    console.log("This is the deleteEvent: ", deleteEvent);

    return res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
