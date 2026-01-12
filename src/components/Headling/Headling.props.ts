import { type HTMLAttributes, type ReactNode } from 'react';

export interface HeadlingProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}