import { useState, useEffect } from 'react';

export default function DocumentTitle(props) {
  const { title } = props;

  function getDocumentTitle() {
    const result = `${title}`;
    return result;
  }

  // eslint-disable-next-line no-unused-vars
  const [docTitle, setDocTitle] = useState(getDocumentTitle());

  useEffect(() => {
    document.title = docTitle;
    return () => {
      document.title = '--';
    };
  }, [docTitle]);

  return null;
}
