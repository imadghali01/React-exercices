import React, { useState } from "react";

export default function SignUp() {
  // **1. States**
  // State pour le contenu du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    password: "",
    verifyP: "",
  });

  // State pour les erreurs du formulaire
  const [formErrors, setFormErrors] = useState({});

  // **2. Composants auxiliaires**
  // Créateur d'input
  const createInput = (type, placeholder, name) => {
    return (
      <div className="flex flex-col gap-2 w-[200px]">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className="border border-gray-300 rounded-[10px] p-[10px] w-full"
        />
        {formErrors[name] && (
          <p className="text-red-500 text-sm">{formErrors[name]}</p>
        )}
      </div>
    );
  };

  // Créateur de bouton
  const createButton = (btnStyle, btnColor, btnWeight, content) => {
    const isValid = isFormValid();
    return (
      <button
        type="button"
        className={`btn ${btnStyle} ${btnColor} ${btnWeight} w-[200px] p-[10px] rounded`}
        style={{
          color: isValid ? "green" : "red",
          cursor: isValid ? "pointer" : "not-allowed",
        }}
        onClick={isValid ? handleClick : undefined} // Pas de clic si le formulaire est invalide
      >
        {content}
      </button>
    );
  };

  // **3. Fonctions de base**
  // Validation d'un seul champ
  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };

    switch (fieldName) {
      case "firstName":
        if (value.length < 3) {
          errors.firstName = "First name must be at least 3 characters long.";
        } else {
          delete errors.firstName;
        }
        break;

      case "lastName":
        if (value.length < 3) {
          errors.lastName = "Last name must be at least 3 characters long.";
        } else {
          delete errors.lastName;
        }
        break;

      case "tel":
        if (!/^\+\d{2}\.\d{3}\.\d{2}\.\d{2}$/.test(value)) {
          errors.tel = "Phone number must follow the format +XX.XXX.XX.XX.";
        } else {
          delete errors.tel;
        }
        break;

      case "password":
        if (value.length < 9) {
          errors.password = "Password must be at least 9 characters long.";
        } else {
          delete errors.password;
        }
        break;

      case "verifyP":
        if (value !== formData.password) {
          errors.verifyP = "Passwords do not match.";
        } else {
          delete errors.verifyP;
        }
        break;

      default:
        break;
    }

    setFormErrors(errors);
  };

  // Vérifie si tous les champs sont valides
  const isFormValid = () =>
    Object.keys(formErrors).length === 0 &&
    Object.values(formData).every((value) => value.trim() !== "");

  // **4. Fonctions principales**
  // Gestion du changement dans les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Met à jour les données du formulaire
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Valide uniquement le champ modifié
    validateField(name, value);
  };

  // Gestion du clic sur le bouton submit
  const handleClick = (e) => {
    e.preventDefault();

    // Vérifie les erreurs avant de soumettre
    if (isFormValid()) {
      alert("Your form was well submitted.");
    }
  };

  // **5. Fonction finale de rendu**
  return (
    <form className="flex flex-col justify-center items-center h-screen gap-[30px]">
      {createInput("text", "First Name", "firstName")}
      {createInput("text", "Last Name", "lastName")}
      {createInput("text", "Phone Number", "tel")}
      {createInput("password", "Password", "password")}
      {createInput("password", "Verify Password", "verifyP")}
      {createButton("btn-outline", "bg-warning", "btn-md", "Submit")}
    </form>
  );
}
