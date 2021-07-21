import styles from '../../../styles/components/Filters.module.css';

function Filters({ category, filters, onChange }) {
  return (
    <div className={styles.filters}>
      <h5 className={styles.title}>{category}</h5>
      <ul className={styles.filter_list}>
        {
          filters
          && filters.map(filter => {
            const id = `${category.toLowerCase()}-${filter.toString().replace(" ", "")}`;
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  name={category.toLowerCase()}
                  onChange={(e) => onChange(category, e.target.checked, filter)}
                  id={id}
                />
                <label htmlFor={id}>{filter}</label>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Filters;