import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import {Error as ErrorPage} from './pages/Error/Error.tsx';
import axios from 'axios';
import {PREFIX} from './helpers/API.ts';
import {lazy, Suspense} from 'react';
import {AuthLayout} from './layout/Auth/AuthLayout.tsx';
import {Login} from './pages/Login/Login.tsx';
import {Register} from './pages/Register/Register.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				errorElement: <ErrorPage />,
				element: <Product />,
				loader: async ({ params }) => {
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			}, {
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
