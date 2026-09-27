import type { ButtonHTMLAttributes } from 'react';
import type { ActionVariant } from '../data/types';
import { cx } from '../lib/cx';
import { linkKind } from '../lib/links';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';
import s from './Button.module.css';

interface CommonProps {
  label: string;
  variant?: ActionVariant;
  size?: 'md' | 'sm';
  className?: string;
  /** Stretch to container width with the icon pushed to the end. */
  block?: boolean;
}

type LinkButtonProps = CommonProps & { to: string };
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { to?: undefined };

/** Hirael-style pill: the label rolls upward and the arrow turns on hover. */
function Inner({ label, external }: { label: string; external: boolean }) {
  return (
    <>
      <span className={s.window}>
        <span className={s.track}>
          <span className={s.line}>{label}</span>
          <span className={s.line} aria-hidden="true">
            {label}
          </span>
        </span>
      </span>
      <span className={s.circle}>
        <Icon name={external ? 'arrow-up-right' : 'arrow-right'} size={16} className={s.arrow} />
      </span>
    </>
  );
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { label, variant = 'accent', size = 'md', className, block = false } = props;
  const classes = cx(s.button, s[variant], size === 'sm' && s.sm, block && s.block, className);

  if (props.to !== undefined) {
    return (
      <SmartLink to={props.to} className={classes}>
        <Inner label={label} external={linkKind(props.to) === 'external'} />
      </SmartLink>
    );
  }

  const { label: _l, variant: _v, size: _s, className: _c, block: _b, type = 'button', ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      <Inner label={label} external={false} />
    </button>
  );
}
