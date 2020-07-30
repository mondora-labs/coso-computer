import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";
import {
    DetailsList,
    SelectionMode,
    IconButton,
    TextField
} from "office-ui-fabric-react";

import Container from "../../components/container";
import Tooltip from "../../components/tooltip";
import UpcycleDialog from "../../components/upcycle-dialog";
import NormalDialog from "../../components/dialog";

const Text = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
`;

const columnsDefinitions = [
    {
        key: "owner",
        fieldName: "owner",
        name: "Ultimo Possessore",
    },
    {
        key: "serial",
        fieldName: "serial",
        name: "Seriale",
    },
    {
        key: "dateFrom",
        fieldName: "dateFrom",
        name: "Acquisto",
    },
    {
        key: "dateUpcycle",
        fieldName: "dateTo",
        name: "Upcycle",
    },
    {
        key: "orgName",
        fieldName: "orgName",
        name: "Associazione",
    }
];

const Upcycled = () => {
    const [sort, setSort] = useState("");
    const [upcycle, setUpcycle] = useState({
        show: false,
    });
    const [note, setNote] = useState({
        show: false,
        text: "",
    });

    const { listUpcycled } = useStoreActions((store) => store.upcycled);
    const { items, fetched } = useStoreState((store) => store.upcycled);

    useEffect(() => {
        if (!fetched) {
            listUpcycled();
        }
    }, [fetched, listUpcycled]);

    const columns = columnsDefinitions.map((columnDefinition) => ({
        isSorted: columnDefinition.key === sort.key,
        isSortedDescending: sort.direction,
        onRender: (item, index, column) => <Text>{item[column.fieldName]}</Text>,
        isResizable: true,
        onColumnClick: (ev, column) => {
            setSort({
                key: column.key,
                direction: sort.key === column.key ? !sort.direction : false,
            });
        },
        ...columnDefinition,
    }));

    const actionsColumns = [
        {
            key: "actions",
            name: "Modifica",
            minWidth: 80,
            onRender: (item) => (
                <>
                    <Tooltip
                        content={item.note !== "Nessuna nota." ? "Note" : "Nessuna nota"}
                        cursor={"pointer"}
                    >
                        <IconButton
                            disabled={!item.note || item.note === "Nessuna nota."}
                            onClick={() => setNote({ show: true, text: item.note })}
                            iconProps={{ iconName: "More" }}
                        />
                    </Tooltip>
                    <Tooltip content="Modifica" cursor={"pointer"}>
                        <IconButton iconProps={{ iconName: "EditNote" }} onClick={() => setUpcycle({ show: true, item: item })} />
                    </Tooltip>
                </>
            ),
        },
    ];

    const filteredItems = items
        .sort((a, b) =>
            (sort.direction ? a[sort.key] < b[sort.key] : a[sort.key] > b[sort.key])
                ? 1
                : -1
        );

    return (
        <Container>
            <NormalDialog
                title="Note"
                subText={note.text}
                hidden={!note.show}
                onDismiss={() => setNote({ ...note, show: false })}
            />
            <UpcycleDialog
                hidden={!upcycle.show}
                onDismiss={() => setUpcycle({ show: false })}
                item={upcycle.item}
            />
            <DetailsList
                selectionMode={SelectionMode.none}
                columns={[...columns, ...actionsColumns]}
                items={filteredItems}
            />
        </Container>
    );
};

export default Upcycled;
