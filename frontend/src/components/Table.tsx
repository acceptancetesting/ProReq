import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${(props) => props.theme.typography.body.fontSize};
`;

const Thead = styled.thead`
  background-color: ${(props) => props.theme.colors.neutral.lightGray};
`;

const Th = styled.th`
  text-align: left;
  padding: ${(props) => props.theme.spacing(1)};
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral.border};
`;

const Td = styled.td`
  padding: ${(props) => props.theme.spacing(1)};
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral.border};
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.colors.neutral.lightGray};
  }
`;

interface TableProps {
  columns: string[];
  rows: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ columns, rows }) => {
  return (
    <TableContainer>
      <StyledTable>
        <Thead>
          <tr>
            {columns.map((col) => (
              <Th key={col}>{col}</Th>
            ))}
          </tr>
        </Thead>
        <tbody>
          {rows.map((row, index) => (
            <Tr key={index}>
              {row.map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
