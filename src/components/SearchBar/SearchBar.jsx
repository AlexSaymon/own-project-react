import { Field, Formik, Form } from "formik";
import s from "./SearchBar.module.css";
import { GoSearch } from "react-icons/go";
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
            <Field
              className={s.field}
              name="query"
              placeholder="Search movies..."
            ></Field>
            <button className={s.button} type="submit" disabled={!values.query}>
              <GoSearch className={s.icon} />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
