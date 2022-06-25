import React from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

import { Board, Thread } from '../../../../types';
import useSendMessage from '../../../utils/sendMessage';

export interface ThreadMessageFormProps {
  boardId: Board['id'];
  threadId: Thread['id'];
  onSend: () => void;
}

interface ThreadMessageFormValues {
  text: string;
  image: string;
}

const ThreadMessageForm: React.FC<ThreadMessageFormProps> = ({
  boardId,
  threadId,
  onSend,
}) => {
  const sendMessage = useSendMessage(boardId, threadId);

  const initialValues = {
    text: '',
    image: '',
  };

  const validationSchema = yup.object({
    text: yup.string().required(),
    image: yup.string(),
  });

  const onSubmit = async (
    { text, image }: ThreadMessageFormValues,
    { resetForm }: FormikHelpers<ThreadMessageFormValues>,
  ) => {
    await sendMessage(text, image);

    onSend();
    resetForm();
  };

  return (
    <Formik<ThreadMessageFormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="flex flex-col my-4">
        <table className="[&_td]:border [&_td]:border-gray-100 [&_td]:border-solid [&_td]:p-2 bg-gray-400">
          <tbody>
            <tr>
              <td>
                <span>Text</span>
              </td>
              <td>
                <Field name="text" type="text" className="w-full" />
                <span className="text-red-800">
                  <ErrorMessage name="text" />
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Image</span>
              </td>
              <td>
                <Field name="image" type="file" />
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <button type="submit" className="bg-blue-100 w-full h-full">
                  Send
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Formik>
  );
};

export default ThreadMessageForm;
