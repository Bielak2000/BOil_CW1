import {
  Alert,
  Button,
  Center,
  Container,
  Paper,
  Select,
  Space,
  TextInput,
} from "@mantine/core";
import { FormEvent, useEffect, useState } from "react";
import { InputData, Form, OutputData } from "./inputData";
import data from "./inputData";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon, MagnificationIcon, DeleteIcon } from "./Icons";
import { useForm, formList } from "@mantine/form";
import client from "./Services/api";
import cytoscape from "cytoscape";
import { draw } from "./graph";
import "./cy.css";
import { drawGantt } from "./ganttFile";

export const DataForm = () => {
  const form = useForm({
    initialValues: {
      actions: formList([{ action: "", duration: "", prev: "", next: "" }]),
    },
  });

  const [klikneto, setKliknieto] = useState(false);
  const [isError, setError] = useState(false);
  const [actionList, setActionList] = useState<InputData[]>([]);
  const [fieldsCount, setFieldsCount] = useState(0);
  const [maxTime, setMaxTime] = useState(undefined);

  const navigate = useNavigate();

  const send = async (values: Form) => {
    const backendData: InputData[] = values.actions.map((v) => {
      return {
        ...v,
        duration: Number(v.duration),
        prev: Number(v.prev),
        next: Number(v.next),
      };
    });
    const output = await client.post("/", backendData);
    setMaxTime(output.data.maxTime);
    setKliknieto(true);
    draw(output.data);
    drawGantt(output.data);
  };

  const fields = form.values.actions.map((_: any, index: number) => (
    <tr key={index}>
      <th>
        <TextInput
          placeholder={"Podaj Nazwe"}
          name={"action"}
          label={""}
          required
          {...form.getListInputProps("actions", index, "action")}
        />
      </th>
      <th>
        <TextInput
          placeholder={"Podaj czas trwania"}
          name={"duration"}
          label={""}
          required
          {...form.getListInputProps("actions", index, "duration")}
        />
      </th>
      <th>
        <TextInput
          placeholder={"Podaj poprzednie zadanie"}
          name={"prev"}
          label={""}
          required
          {...form.getListInputProps("actions", index, "prev")}
        />
      </th>
      <th>
        <TextInput
          placeholder={"Podaj następne zdarzenie"}
          name={"next"}
          label={""}
          required
          {...form.getListInputProps("actions", index, "next")}
        />
      </th>
    </tr>
  ));

  return (
    <Container size="xl">
      <Space h="md" />
      <h1>CPM Solution</h1>
      <Center>
        <Paper style={{ width: 1000 }} shadow="xs" radius="lg">
          <form onSubmit={form.onSubmit(async (values) => await send(values))}>
            <table style={{ width: 1000 }}>
              <tr>
                <th>
                  <Button
                    onClick={() => {
                      form.addListItem("actions", {
                        action: "",
                        duration: "",
                        prev: "",
                        next: "",
                      });
                      setFieldsCount(fieldsCount + 1);
                    }}
                    fullWidth
                    style={{ background: "green" }}
                  >
                    ADD
                  </Button>
                </th>
                <th>
                  <Button
                    fullWidth
                    style={{ background: "#960920" }}
                    onClick={() => {
                      form.removeListItem(
                        "actions",
                        fieldsCount
                        //form.getListInputProps.length + 1
                        //form.getListInputProps.length
                      );
                      setFieldsCount(fieldsCount - 1);
                    }}
                  >
                    Delete
                  </Button>
                </th>
                <th>
                  <Button
                    type="submit"
                    fullWidth
                    style={{ background: "blue" }}
                  >
                    Solve
                  </Button>
                </th>
              </tr>
            </table>
          </form>
          <table>
            <tr>
              <th style={{ width: 250 }}>Action</th>
              <th style={{ width: 250 }}>Duration</th>
              <th style={{ width: 250 }}>Prev</th>
              <th style={{ width: 250 }}>Next</th>
            </tr>

            <tbody>{fields}</tbody>
          </table>

          {isError && (
            <>
              <Space h="md" />
              <Alert color="red" title="Błąd">
                Podano nieprawidłowe dane
              </Alert>
            </>
          )}

          <div id="space1"></div>

          {klikneto && (
            <>
              <script src="./graph.js"></script>
              <div id="grid">
                <div id="legend">
                  <img src="https://media.discordapp.net/attachments/770714777076105238/960972135503896637/Wheel_legend.png" width="500" height="85"/>
                </div>
                <div id="maxTime">{`Czas krytyczny: ${maxTime}`}</div>
                <div id="empty"></div>
              </div>
              <div id="cy"></div>
              <div id="space1"></div>
              <div id="Gantt">
                <script src="dhtmlxgantt.js" ></script>
                <link rel="stylesheet" href="dhtmlxgantt.css" type="text/css"/>
                <div id="gantt_here"></div>
              </div>
              <div id="space1"></div>
            </>
          )}

        </Paper>
      </Center>
    </Container>
  );
};
