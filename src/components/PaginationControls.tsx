import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";

type PaginationControlsProps = {
  onClick: (direction: PageDirection) => void;
  currentPage: number;
  totalNumberOfPages: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalNumberOfPages,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction={"prev"}
          currentPage={currentPage}
          onClick={onClick}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction={"next"}
          currentPage={currentPage}
          onClick={onClick}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: (direction: PageDirection) => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick(direction);
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "next" ? (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      ) : (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
    </button>
  );
}
