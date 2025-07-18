import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import type { FormikHelpers } from 'formik';

interface FormValues {
  title: string;
  text: string;
  priority: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  text: Yup.string().required('Text is required'),
  priority: Yup.string().required('Priority is required'),
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const initialValues: FormValues = {
    title: '',
    text: '',
    priority: 'low',
  };

  const handleSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    helpers.resetForm();
    onClose();
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { values, errors, touched, handleChange, handleSubmit: submitForm, isSubmitting } = formik;

  return (
    <form className={css.form} onSubmit={submitForm}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={values.title}
          onChange={handleChange}
          autoComplete="off"
        />
        {touched.title && errors.title && (
          <div className={css.error}>{errors.title}</div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          name="text"
          className={css.textarea}
          rows={4}
          value={values.text}
          onChange={handleChange}
          autoComplete="off"
        />
        {touched.text && errors.text && (
          <div className={css.error}>{errors.text}</div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          className={css.select}
          value={values.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {touched.priority && errors.priority && (
          <div className={css.error}>{errors.priority}</div>
        )}
      </div>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          Save
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}