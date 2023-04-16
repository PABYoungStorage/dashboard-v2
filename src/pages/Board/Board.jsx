import Board, {
  moveCard,
  moveColumn,
  removeCard,
  addCard,
} from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
// import useBoard from '../../store/Board';
import "./Board.css";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import AddCardModal from "../../components/AddCardModal/AddCardModal";
import { useEffect, useState } from "react";
import { create } from "zustand";
// import { boardData } from "../../data";

const BoardPage = () => {
  const [boardData, setboardData] = useState({ columns: [] });
  useEffect(() => {
    const boards = async () => {
      const data = await fetch("http://localhost:3000/api/boards")
        .then((res) => res.json())
        .catch((a) => alert(a));
      if (data.status) {
        setboardData((a) => ({ ...a, columns: data.message }));
      }
    };
    boards();
  }, []);
  const useBoard = create((set) => {
    return {
      board: boardData,
      setBoard: (board) => set((state) => ({ board })),
    };
  });

  const { board, setBoard } = useBoard();

  const handleColumnMove = (_card, source, destination) => {
    // console.log(board, source, destination)
    const updatedBoard = moveColumn(board, source, destination);
    setBoard(updatedBoard);
  };

  const handleCardMove = async (_card, source, destination) => {
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);
    await fetch(
      `http://localhost:3000/api/boards/${source.fromColumnId}/move/${destination.toColumnId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(_card),
      }
    );
    window.location.reload();
    // console.log(_card, source, destination);
  };

  const getColumn = (card) => {
    const column = board.columns.filter((column) =>
      column.cards.includes(card)
    );
    return column[0];
  };

  const getGradient = (card) => {
    const column = getColumn(card);
    const title = column.title;
    if (title === "TODO") {
      return {
        background:
          "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 189, 220) 163.54%)",
      };
    } else if (title === "Doing") {
      return {
        background:
          "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(220, 48, 48) 163.54%)",
      };
    } else if (title === "Completed") {
      return {
        background:
          "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 220, 86) 163.54%)",
      };
    } else if (title === "Backlog") {
      return {
        background:
          "linear-gradient(65.35deg, rgba(65, 65,65, 0.67) -1.72%,rgba(134, 48, 220) 163.54%)",
      };
    }
  };

  return (
    <div className="board-container">
      <span>Trello Board</span>

      <Board
        allowAddColumn
        allowRenameColumn
        allowRemoveCard
        onCardDragEnd={handleCardMove}
        onColumnDragEnd={handleColumnMove}
        renderCard={(props) => (
          <div className="kanban-card" style={getGradient(props)}>
            <div>
              <span>{props.title}</span>
              <button
                className="remove-button"
                type="button"
                onClick={async () => {
                  const data = await fetch(
                    `http://localhost:3000/api/boards/${
                      getColumn(props).id
                    }/cards/${props.id}`,
                    {
                      method: "DELETE",
                    }
                  )
                    .then((res) => res.json())
                    .catch((a) => alert(a));
                  if (data.status) {
                    window.location.reload();
                  }
                  //   const updatedBoard = removeCard(
                  //     board,
                  //     getColumn(props),
                  //     props
                  //   );
                  //   setBoard(updatedBoard);
                }}
              >
                <RxCross2 color="white" size={15} />
              </button>
            </div>
            <span>{props.description}</span>
          </div>
        )}
        renderColumnHeader={(props) => {
          const [modalOpened, setModalOpened] = useState(false);

          const handleCardAdd = async (title, detail) => {
            const data = await fetch(
              `http://localhost:3000/api/boards/${props.id}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: new Date().getTime(),
                  title,
                  description: detail,
                }),
              }
            )
              .then((res) => res.json())
              .catch((a) => alert(a));

            // setboardData((a) => ({ ...a, columns: data }));
            if (data.status) {
              window.location.reload();
              //   const card = {
              //     id: props.cards.length + 1,
              //     title,
              //     description: detail,
              //   };

              //   const updatedBoard = addCard(board, props, card);
              //   setBoard(updatedBoard);
              //   setModalOpened(false);
            }
          };

          return (
            <div className="column-header">
              <span>{props.title}</span>

              <IoMdAdd
                color="white"
                size={25}
                title="Add card"
                onClick={() => setModalOpened(true)}
              />
              <AddCardModal
                visible={modalOpened}
                handleCardAdd={handleCardAdd}
                onClose={() => setModalOpened(false)}
              />
            </div>
          );
        }}
      >
        {board}
      </Board>
    </div>
  );
};

export default BoardPage;
