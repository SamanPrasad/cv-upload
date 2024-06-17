import { Pagination } from "react-bootstrap";

interface Props {
  activePage: number;
  itemsCount: number;
  range: number;
  onPageClick: (id: number) => void;
}

function Paginator({ activePage, itemsCount, range, onPageClick }: Props) {
  const pagesCount = Math.ceil(itemsCount / range);
  let items = [];
  for (let number = 1; number <= pagesCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => onPageClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination size="sm">
        <Pagination.First>{"<< First"}</Pagination.First>
        {items}
        <Pagination.Last>{"Last >>"}</Pagination.Last>
      </Pagination>
    </div>
  );
}

export default Paginator;
