import React, { useMemo } from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import { Button } from "react-bootstrap";
import { Column } from "react-table";
import DataGrid, { GridCell } from "../shared/grid/DataGrid";
import { TodoItem } from "../types";

type Props = {
  isLoading: boolean;
  todoItems: TodoItem[];
  selectTodoItem: (todoItem: TodoItem) => void;
  showResolved: boolean;
};

const TodoGrid = ({
  isLoading,
  todoItems,
  selectTodoItem,
  showResolved,
}: Props) => {
  const columns: Column<any>[] = useMemo(() => {
    const cols = [
      {
        Header: "Name",
        accessor: "name",
        width: 200,
        Cell: ({ row, value }: any) => (
          <div className="ellipsis w-100" title={value}>
            <Button
              variant="link"
              size="sm"
              onClick={selectTodoItem.bind(null, row.original)}
            >
              {value}
            </Button>
          </div>
        ),
      },
      {
        Header: "Probability",
        headerClassName: "text-center",
        accessor: "probability",
        Cell: ({ value }: any) => <GridCell value={value} format="0%" />,
      },
    ];

    if (showResolved) {
      cols.push({
        Header: "Was True",
        headerClassName: "text-center",
        accessor: "isTrue",
        Cell: ({ value }: any) => {
          return (
            <div className="text-center" title={value ? "True" : "False"}>
              <i
                className={classNames("fas", {
                  "fa-check": value,
                  "fa-times": !value,
                })}
              />
            </div>
          );
        },
      });
    } else {
      cols.push({
        Header: "Revisit On",
        headerClassName: "text-center",
        accessor: "revisitOn",
        Cell: ({ value }: any) => {
          const date = new Date(value);
          return (
            <span>{`${
              date.getUTCMonth() + 1
            }/${date.getUTCDate()}/${date.getUTCFullYear()}`}</span>
          );
        },
      });
    }

    return cols;
  }, [showResolved, selectTodoItem]);

  return (
    <div className="market-share-grid">
      {isLoading ? (
        <Skeleton height={420} />
      ) : todoItems && todoItems.length ? (
        <DataGrid columns={columns} data={todoItems} rowHeight={40} />
      ) : null}
    </div>
  );
};

export default TodoGrid;
