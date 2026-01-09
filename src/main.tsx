import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Menu } from './pages/Menu/Menu.tsx';
import { Layout } from './layout/Menu/Layout.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Menu />
			},
			{
				path: '/cart',
				element: <Cart />
			}
		]
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
