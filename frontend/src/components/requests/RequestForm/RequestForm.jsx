import { useState } from "react";

const initialFormData = {
  name: "",
  address: "",
  serviceType: "",
};

const serviceOptions = [
  { value: "gutter installation", label: "Gutter installation" },
  { value: "gutter repair", label: "Gutter repair" },
  { value: "gutter cleaning", label: "Gutter cleaning" },
];

const fieldClasses =
  "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

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
      // Parent displays API errors.
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <fieldset disabled={isSubmitting} className="space-y-6">
        <legend className="sr-only">New service request</legend>

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
            className={fieldClasses}
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
            className={fieldClasses}
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
            className={fieldClasses}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {validationError && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {validationError}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-400">
          Fields marked by the form are required to create a request.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
          )}
          {isSubmitting ? "Creating request..." : "Create request"}
        </button>
      </div>
    </form>
  );
}

export default RequestForm;
