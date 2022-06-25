import { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import { useUser } from 'reactfire';
import { updateProfile } from 'firebase/auth';
import { UserContext } from '../../app/UserProvider';

const UsernameForm = () => {
  const { data: firebaseUser } = useUser();
  const { username: currentUsername } = useContext(UserContext);

  if (!firebaseUser) return null;

  const initialValues = {
    username: currentUsername ?? '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ username }) => {
        updateProfile(firebaseUser, {
          displayName: username,
        });
      }}
    >
      <Form>
        <div className="flex">
          <Field
            name="username"
            style={{
              boxShadow:
                'inset -1px -1px #fff,inset 1px 1px grey,inset -2px -2px #dfdfdf,inset 2px 2px #0a0a0a',
              padding: '3px 4px',
            }}
          />
          <button
            type="submit"
            className="ml-5"
            style={{
              background: 'silver',
              boxShadow:
                'inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf',
              border: 'none',
              borderRadius: '0',
              boxSizing: 'border-box',
              minHeight: '23px',
              minWidth: '75px',
              padding: '0 12px',
            }}
          >
            Change username
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default UsernameForm;
