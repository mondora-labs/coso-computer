import React, { useState, useEffect } from "react";

import moment from "moment";
import stringify from "csv-stringify";

import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";
import {
    DetailsList,
    SelectionMode,
    IconButton,
    DefaultButton,
    Stack
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
        name: "Ultimo Possessore"
    },
    {
        key: "serial",
        fieldName: "serial",
        name: "Seriale"
    },
    {
        key: "dateFrom",
        fieldName: "dateFrom",
        name: "Acquisto",
        onRender: (item) => (
            <Text>{moment(item.dateFrom).format("DD/MM/YYYY")}</Text>
        )
    },
    {
        key: "dateUpcycle",
        fieldName: "dateTo",
        name: "Upcycle",
        onRender: (item) => (
            <Text>{moment(item.dateTo).format("DD/MM/YYYY")}</Text>
        )
    },
    {
        key: "orgName",
        fieldName: "orgName",
        name: "Associazione",
        minWidth: 180
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
                        cursor="pointer"
                    >
                        <IconButton
                            disabled={!item.note || item.note === "Nessuna nota."}
                            onClick={() => setNote({ show: true, text: item.note })}
                            iconProps={{ iconName: "More" }}
                        />
                    </Tooltip>
                    <Tooltip content="Modifica" cursor="pointer">
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

    const handleExport = () => {
        const exportItems = filteredItems.map((item) => ({
            ...item,
            dateTo: moment.utc(item.dateTo).format("DD-MM-YYYY"),
            dateFrom: moment.utc(item.dateFrom).format("DD-MM-YYYY"),
        }));

        const options = {
            header: true,
        };

        stringify(exportItems, options, (err, output) => {
            var element = document.createElement("a");
            document.body.appendChild(element);

            element.setAttribute(
                "href",
                `data:text/csv;base64,${btoa(unescape(encodeURIComponent(output)))}`
            );
            element.setAttribute("target", "_blank");
            element.setAttribute("download", "upcycled.csv");
            element.click();
            document.body.removeChild(element);
        });
    };

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
                origin="upcycled"
            />
            <DetailsList
                selectionMode={SelectionMode.none}
                columns={[...columns, ...actionsColumns]}
                items={filteredItems}
            />
            <br />
            <Stack horizontal reversed>
                <Stack.Item align="center">
                    <DefaultButton
                        text="Esporta .csv"
                        iconProps={{ iconName: "DownloadDocument" }}
                        onClick={handleExport}
                    />
                </Stack.Item>
            </Stack>
        </Container>
    );
};

export default Upcycled;
