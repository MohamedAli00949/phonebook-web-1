import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { useForm, useFieldArray } from "react-hook-form";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdAdd } from "react-icons/md";

import {
  createContact,
  updateContact,
  UPDATE_CONTACT,
  CREATE_CONTACT,
  CONTACT_ERROR,
} from "../../../actions/contacts";
import { createPhone, updatePhone, deletePhone } from "../../../actions/phones";

function ContactForm(props) {
  const { currentId, setCloseForm } = props;
  const [contactData, setContactData] = useState({
    email: "",
    name: "",
    notes: "",
    phones: [],
  });
  const [noChange, setNoChange] = useState(true);
  const [phones2, setPhones2] = useState([]);
  const [deletedPhones, setDeletedPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const contact = useSelector((state) =>
    state.contacts.contacts.find((contact) => contact.id === currentId)
  );
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state.phones);

  const { register, errors, handleSubmit, control, reset } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
    keyName: "pid",
  });

  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phonePattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/;

  const phoneTypes = types?.data;

  // This Function For Clearing the Contact Data.
  const clear = () => {
    setContactData({ email: "", name: "", notes: "", phones: [] });
    setCloseForm(true);
    reset({ phones: [] });
  };

  useEffect(() => {
    if (contact) {
      if (contact.phones.length === 0) {
        append({ value: "", type_id: 1 });
      } else {
        append(contact.phones);
        console.log(contact.phones);
        setPhones2(contact.phones);
      }

      setContactData({
        email: contact.email,
        name: contact.name,
        notes: contact.notes,
        phones: [],
      });
    } else {
      append({ value: "", type_id: 1 });
    }
  }, [contact]);

  const handleSubmitData = async ({ phones, ...data }) => {
    await console.log("phones", phones, "deleteed phones : ", deletedPhones);

    await phones?.forEach((phone, index) => {
      phone.id = phones2[index]?.id;
    });

    const oldPhones = [];

    const newPhones = [];

    phones?.forEach((phone) => {
      {
        phone.id ? oldPhones.push(phone) : newPhones.push(phone);
      }
    });

    console.log("New Phones", newPhones, "oldPhones", oldPhones);

    if (contact) {
      if (data.name && data.name !== contact?.name)
        contactData.name = data.name;
      if (data.email && data.email !== contact.email)
        contactData.email = data.email;
      if (data.notes && data.notes !== contact.notes)
        contactData.notes = data.notes;

      if (!data.notes) {
        await delete contactData.notes;
      }

      if (!data.email) {
        await delete contactData.email;
      }

      const updatedPhones = oldPhones.filter(({ value, type_id, id }) => {
        const exist = phones2.find((p) => (p.id = id));

        if (value !== exist.value || type_id !== exist.type_id) return true;
        return false;
      });

      const promises = [];

      deletedPhones.forEach((p) => deletePhone(p.id));

      newPhones?.forEach((phone) =>
        promises.push(createPhone({ contact_id: contact.id, ...phone }))
      );

      updatedPhones.forEach(({ id, ...phone }) =>
        promises.push(updatePhone(id, phone))
      );

      await delete contactData.phones;

      setIsLoading(true);

      Promise.all(promises).then(() => {
        updateContact(currentId, contactData)
          .then((response) => {
            if (contact) {
              contact.phones = contact.phones.filter((phone) => {
                return !deletedPhones?.includes(phone);
              });
            }

            dispatch({ type: UPDATE_CONTACT, data: response });
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            dispatch({ type: CONTACT_ERROR, data: error.response.data });
            setIsLoading(false);
          });
      });
    } else {
      if (data.name) {
        contactData.name = data.name;
      } else {
        delete contactData.name;
      }

      if (data.email) {
        contactData.email = data.email;
      } else {
        delete contactData.email;
      }

      if (data.notes) {
        contactData.notes = data.notes;
      } else {
        delete contactData.notes;
      }

      const realPhones = newPhones.filter(
        (phone) => phone.value || phone.type_id
      );
      await realPhones.map((phone) =>
        setContactData({
          ...contactData,
          phone: contactData.phones.push(phone),
        })
      );

      await setIsLoading(true);

      await createContact(contactData)
        .then((response) => {
          dispatch({ type: CREATE_CONTACT, data: response.contact });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: CONTACT_ERROR, data: error.response?.data });
          setIsLoading(false);
        });
    }

    await console.log(
      "contact data",
      contactData,
      "data",
      data,
      "phones",
      phones
    );

    clear();
  };

  const removePhones = async (index) => {
    await remove(index);
    const phone = phones2[index];
    if (phone?.id) {
      await setDeletedPhones([...deletedPhones, phone]);
      const afterDelete = phones2.filter((p) => p.id !== phone.id);
      setPhones2(afterDelete);
      setNoChange(false);
    }
    await console.log(phone, deletedPhones);
  };

  return isLoading ? (
    <>
      <CircularProgress disableShrink />
      <div className="overlay2"></div>
    </>
  ) : (
    <div className="contact-form">
      <Button className="close" onClick={clear}>
        <AiOutlineCloseCircle />
      </Button>
      <form autoComplete="off" onSubmit={handleSubmit(handleSubmitData)}>
        <TextField
          className="input"
          name="name"
          variant="filled"
          label="Name"
          fullWidth
          onChange={() => setNoChange(false)}
          defaultValue={contact?.name}
          inputRef={register({ required: "Name is required" })}
        />
        {errors.name && (
          <span className="contact-error">{errors.name.message}</span>
        )}
        <TextField
          className="input"
          name="email"
          variant="filled"
          label="Email"
          fullWidth
          onChange={() => setNoChange(false)}
          defaultValue={contact?.email}
          inputRef={register({
            pattern: { value: emailPattern, message: "Email is invalid" },
          })}
        />
        {errors.email && (
          <span className="contact-error">{errors.email.message}</span>
        )}
        <TextField
          className="input"
          name="notes"
          variant="filled"
          label="Notes"
          fullWidth
          defaultValue={contact?.notes}
          onChange={() => setNoChange(false)}
          inputRef={register()}
        />
        <div className="phones-fields">
          {fields.map((field, index) => (
            <div key={field.pid} className="form-inputs">
              <div className="phone-input">
                <TextField
                  variant="outlined"
                  name={`phones.${index}.value`}
                  label="Phone Number"
                  fullWidth
                  defaultValue={field?.value}
                  onChange={() => setNoChange(false)}
                  inputRef={register({
                    pattern: {
                      value: phonePattern,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
              </div>
              <div className="phone-types">
                <select
                  defaultValue={field.type_id}
                  name={`phones.${index}.type_id`}
                  ref={register({ valueAsNumber: true })}
                >
                  {phoneTypes.map(({ id, value }) => (
                    <option value={id} key={id}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <IconButton onClick={() => removePhones(index)}>
                <AiOutlineCloseCircle />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="contact-buttons">
          <Button
            className="submit"
            style={{
              width: "31%",
              marginInline: "1%",
              height: "50px",
              textTransform: "capitalize",
            }}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            disabled={noChange}
          >
            {contact ? `Save Changes` : `Add Contact`}
          </Button>
          <Button
            className="submit"
            style={{
              width: "31%",
              marginInline: "1%",
              height: "50px",
              textTransform: "capitalize",
            }}
            variant="contained"
            color="secondary"
            size="large"
            type="button"
            fullWidth
            onClick={clear}
          >
            Close
          </Button>
          <Button
            className="submit"
            style={{
              width: "31%",
              marginInline: "1%",
              background: "aliceblue",
              height: "50px",
              textTransform: "capitalize",
            }}
            color="primary"
            onClick={() => append({ value: "", type_id: 1 })}
            type="button"
          >
            <MdAdd /> &nbsp; Add Phone
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
