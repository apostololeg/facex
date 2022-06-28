import { useCallback, useState, memo } from 'react';
import { Input, Button } from '@foreverido/uilib';

type Props = {
  id: string;
  className?: string;
};

export default memo(function ShareId({ id, className }: Props) {
  const link = `https://facex.apostol.space/call?id=${id}`;
  const [isCopied, setCopied] = useState(false);

  const onChange = useCallback(() => false, []);

  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(link).then(() => setCopied(true));
  }, []);

  const onShareClick = useCallback(() => {
    navigator.share({
      title: 'Answer the call',
      text: 'Answer the call',
      url: link,
    });
  }, []);

  return (
    <Input
      className={className}
      label="Lint to this call"
      value={link}
      onChange={onChange}
      size="l"
      adornmentRight={
        <>
          <Button variant="clear" onClick={onCopyClick}>
            {isCopied ? 'Copied' : 'Copy'}
          </Button>
          {navigator.share && (
            <Button variant="clear" onClick={onShareClick}>
              Share
            </Button>
          )}
        </>
      }
    />
  );
});
