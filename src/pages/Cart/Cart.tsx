import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { type AppDispatch, type RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useMemo, useState } from 'react';
import { type Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';
import Button from '../../components/Button/Button';

const DELIVERY_FEE = 169;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);

	const itemsCountTotal = items.reduce((acc, i) => acc + i.count, 0);

	// Build Map for O(1) product lookups
	const productMap = useMemo(
		() => new Map(cartProducts.map(p => [p.id, p])),
		[cartProducts]
	);

	// Combine array iterations into single reduce
	const total = items.reduce((acc, i) => {
		const product = productMap.get(i.id);
		return product ? acc + (i.count * product.price) : acc;
	}, 0);

	const jwt = useSelector((s: RootState) => s.user.jwt);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const checkout = async () => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartActions.clean());
		navigate('/success');
	};

	useEffect(() => {
		const getItem = async (id: number) => {
			const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
			return data;
		};

		const loadAllItems = async () => {
			try {
				const res = await Promise.all(items.map(i => getItem(i.id)));
				setCartProducts(res);
			} catch (error) {
				console.error('Failed to load cart items:', error);
			}
		};

		loadAllItems();
	}, [items]);

	return <>
		<Headling className={styles['headling']}>Корзина</Headling>
		{items.map(i => {
			const product = productMap.get(i.id);
			if (!product) {
				return null;
			}
			return <CartItem key={i.id} count={i.count} {...product} />;
		})}
		<div className={styles['line']}>
			<div className={styles['text']}>Итог</div>
			<div className={styles['price']}>{total}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles['hr']} />
		<div className={styles['line']}>
			<div className={styles['text']}>Доставка</div>
			<div className={styles['price']}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles['hr']} />
		<div className={styles['line']}>
			<div className={styles['text']}>Итог <span className={styles['total-count']}>({itemsCountTotal})</span></div>
			<div className={styles['price']}>{total + DELIVERY_FEE}&nbsp;<span>₽</span></div>
		</div>
		<div className={styles['checkout']}>
			<Button appearance="big" onClick={checkout}>оформить</Button>
		</div>
	</>;
}