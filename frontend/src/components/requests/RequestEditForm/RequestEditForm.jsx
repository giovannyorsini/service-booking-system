import { useState } from "react";

const serviceOptions = [
  { value: "gutter installation", label: "Gutter installation" },
  { value: "gutter repair", label: "Gutter repair" },
  { value: "gutter cleaning", label: "Gutter cleaning" },
];

const fieldClasses =
  "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

function RequestEditForm({ request, onSubmit, onCancel, isSubmitting }) {
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
        <legend className="sr-only">Edit service request</legend>

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
            className={fieldClasses}
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
            className={fieldClasses}
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
            className={fieldClasses}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
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

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition duration-200 hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
          )}
          {isSubmitting ? "Saving changes..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

export default RequestEditForm;
