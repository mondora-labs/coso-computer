import React, { useState, useEffect } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";
import {
    DetailsList,
    SelectionMode,
    IconButton
} from "office-ui-fabric-react";

import Container from "../../components/container";
import Tooltip from "../../components/tooltip";
import UpcycleDialog from "../../components/upcycle-dialog";

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
    const [upcycle, setUpcycle] = useState({
        show: false,
    });

    const { listUpcycled } = useStoreActions((store) => store.upcycled);
    const { items, fetched } = useStoreState((store) => store.upcycled);

    useEffect(() => {
        if (!fetched) {
            listUpcycled();
        }
    }, [fetched, listUpcycled]);

    const columns = columnsDefinitions.map((columnDefinition) => ({
        onRender: (item, index, column) => <Text>{item[column.fieldName]}</Text>,
        isResizable: true,
        ...columnDefinition,
    }));

    const actionsColumns = [
        {
            key: "actions",
            name: "Modifica",
            minWidth: 80,
            onRender: () => (
                <>
                    <Tooltip
                        content={"Note"}
                        cursor={"pointer"}
                    >
                        <IconButton
                            iconProps={{ iconName: "More" }}
                        />
                    </Tooltip>
                    <Tooltip content="Modifica" cursor={"pointer"}>
                        <IconButton iconProps={{ iconName: "EditNote" }} onClick={() => setUpcycle({ show: true })} />
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <Container>
            <UpcycleDialog
                hidden={!upcycle.show}
                onDismiss={() => setUpcycle({ show: false })}
            />
            <DetailsList
                selectionMode={SelectionMode.none}
                columns={[...columns, ...actionsColumns]}
                items={items}
            />
        </Container>
    );
};

export default Upcycled;
