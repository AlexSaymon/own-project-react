import { Field, Formik, Form } from "formik";
import s from "./SearchBar.module.css";
const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    handleChangeQuery(values.query);
  };
  return (
    <div className={s.wrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <Field name="query" />
            <button type="submit" disabled={!values.query}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
