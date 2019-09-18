import React from 'react';
import PropTypes from 'prop-types';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class CodeBlock extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {
    let { language, value } = this.props;

    if (language === 'html') language = 'markup';
    if (language === 'js') language = 'javascript';

    SyntaxHighlighter.registerLanguage('markup', markup);
    SyntaxHighlighter.registerLanguage('javascript', javascript);

    return (
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{ padding: 0 }}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}
