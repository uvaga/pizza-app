import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import axios, {AxiosError} from 'axios';
import {MenuList} from '../../components/MenuList/MenuList.tsx';

export default function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();	

	useEffect(() => {
		const getMenu = async (name?: string) => {
			try {
				const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
					params: {
						name
					}
				});
				setProducts(data);
				setIsLoading(false);
			} catch (e) {
				console.error(e);
				if (e instanceof AxiosError) {
					setError(e.message);
				}
				setIsLoading(false);
				return;
			}
		};
		getMenu(filter);
	}
	,[filter]);	

	const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' onChange={updateFilter}/>
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && products.length > 0 && <MenuList products={products} />}
			{isLoading && <>Загружаем продукты</>}
			{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
		</div>

	</>;
}