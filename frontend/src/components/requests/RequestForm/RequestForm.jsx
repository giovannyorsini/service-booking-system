import { useState } from "react";

const initialFormData = {
  name: "",
  address: "",
  serviceType: "",
};

const serviceOptions = [
  {
    value: "gutter installation",
    label: "Gutter installation",
  },
  {
    value: "gutter repair",
    label: "Gutter repair",
  },
  {
    value: "gutter cleaning",
    label: "Gutter cleaning",
  },
];

function RequestForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (validationError) {
      setValidationError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanedData = {
      name: formData.name.trim(),
      address: formData.address.trim(),
      serviceType: formData.serviceType,
    };

    if (!cleanedData.name || !cleanedData.address || !cleanedData.serviceType) {
      setValidationError("Please complete all required fields.");
      return;
    }

    try {
      await onSubmit(cleanedData);

      setFormData(initialFormData);
      setValidationError("");
    } catch {
      // Submission errors are handled by the parent.
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-7
      "
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-800">
            Customer name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            autoComplete="name"
            className="
              mt-2
              block
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-950
              outline-none
              transition
              duration-200
              placeholder:text-slate-400
              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-100
            "
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="text-sm font-medium text-slate-800"
          >
            Service address
          </label>

          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main Street"
            autoComplete="street-address"
            className="
              mt-2
              block
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-950
              outline-none
              transition
              duration-200
              placeholder:text-slate-400
              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-100
            "
          />
        </div>

        <div>
          <label
            htmlFor="serviceType"
            className="text-sm font-medium text-slate-800"
          >
            Service type
          </label>

          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="
              mt-2
              block
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-950
              outline-none
              transition
              duration-200
              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-100
            "
          >
            <option value="">Select a service</option>

            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {validationError && (
        <p
          role="alert"
          className="
            mt-5
            rounded-xl
            border
            border-rose-200
            bg-rose-50
            px-4
            py-3
            text-sm
            text-rose-700
          "
        >
          {validationError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          mt-7
          inline-flex
          w-full
          items-center
          justify-center
          rounded-xl
          bg-slate-950
          px-4
          py-3
          text-sm
          font-medium
          text-white
          shadow-sm
          transition
          duration-200
          hover:-translate-y-0.5
          hover:bg-slate-800
          disabled:cursor-not-allowed
          disabled:opacity-60
          sm:w-auto
        "
      >
        {isSubmitting ? "Creating request..." : "Create request"}
      </button>
    </form>
  );
}

export default RequestForm;
