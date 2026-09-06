import { useState } from "react";

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

function RequestEditForm({ request, onSubmit, onCancel, isSubmitting }) {
  // Initialize form data state with the request prop or default values
  const [formData, setFormData] = useState(() => ({
    name: request?.name || "",
    address: request?.address || "",
    serviceType: request?.serviceType || "",
    status: request?.status || "pending",
  }));

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
      status: formData.status,
    };

    if (
      !cleanedData.name ||
      !cleanedData.address ||
      !cleanedData.serviceType ||
      !cleanedData.status
    ) {
      setValidationError("Please complete all required fields.");

      return;
    }

    try {
      await onSubmit(cleanedData);
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
          <label
            htmlFor="edit-name"
            className="text-sm font-medium text-slate-800"
          >
            Customer name
          </label>

          <input
            id="edit-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
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
            htmlFor="edit-address"
            className="text-sm font-medium text-slate-800"
          >
            Service address
          </label>

          <input
            id="edit-address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
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
              focus:border-slate-400
              focus:ring-4
              focus:ring-slate-100
            "
          />
        </div>

        <div>
          <label
            htmlFor="edit-serviceType"
            className="text-sm font-medium text-slate-800"
          >
            Service type
          </label>

          <select
            id="edit-serviceType"
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

        <div>
          <label
            htmlFor="edit-status"
            className="text-sm font-medium text-slate-800"
          >
            Status
          </label>

          <select
            id="edit-status"
            name="status"
            value={formData.status}
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
            <option value="pending">Pending</option>

            <option value="completed">Completed</option>
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

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-slate-700
            transition
            duration-200
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
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
          {isSubmitting ? "Saving changes..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

export default RequestEditForm;
