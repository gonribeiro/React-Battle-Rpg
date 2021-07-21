import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import MUIDataTable from "mui-datatables";

import { Grid, Avatar } from '@material-ui/core';

import BackUrl from '../utils/BackUrl';

type FirebaseRanking = Record<string, {
  name: string,
  avatar: string,
  score: string
}>

type RankingType = {
  id: string,
  name: string,
  avatar: string,
  score: string
}

export default function Mui() {
  const [ranking, setRanking] = useState<RankingType[]>([]);

  useEffect(() => {
    const rankingRef = database.ref(`ranking`);

    rankingRef.on('value', ranking => {
      const databaseRanking = ranking.val();
      const firebaseRanking: FirebaseRanking = databaseRanking ?? {};

      const parsedRanking = Object.entries(firebaseRanking).map(([key, value]) => {
          return {
              id: key,
              name: value.name,
              avatar: value.avatar,
              score: value.score,
          }
      });

      setRanking(parsedRanking.sort((a, b) => parseFloat(b.score) - parseFloat(a.score))); // ordenando
    });

    return () => {
      rankingRef.off('value')
    }
  }, []);

  const columns: any = [
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (rowIndex, dataIndex) => {
          return (
            <>
             {rowIndex + 1}º
            </>
          );
        }
      }
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (rowIndex, dataIndex) => {
          return (
            <Avatar
                alt={'Avatar de: ' + ranking[rowIndex].name}
                src={ranking[rowIndex].avatar}
            ></Avatar>
          );
        }
      }
    },
    {
      name: "name",
      label: "Nome",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField'
      }
    },
    {
      name: "score",
      label: "Pontuação",
      options: {
        filter: true,
        sort: true,
        filterType: 'textField'
      }
    },
  ];

  const options: any = {
    filter: true,
    selectableRows: 'none',
    filterType: 'dropdown',
    responsive: 'vertical',
    fixedHeader: true,
    tableBodyHeight: window.innerHeight - 210,
    print: false,
    download: false,
    viewColumns: false,
    rowsPerPage: 100,
    rowsPerPageOptions: [15, 100, 250, 500],
    enableNestedDataAccess: '.',
    setTableProps: () => {
      return {
        size: 'small',
      };
    },
    textLabels: {
      body: {
        noMatch: "Nenhum registro encontrado.",
      },
      toolbar: {
        search: 'Pesquisar',
        filterTable: 'Pesquisa Avançada',
      },
      filter: {
        title: "Pesquisar",
        reset: "Limpar",
        rowsPerPage: "Linhas por página",
      },
      pagination: {
        rowsPerPage: "Registros por página:",
      },
    },
  };

  return (
    <div
      style={{
          backgroundImage: "url(img/screens/background-battle5.jpg)",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: "97vh",
          width: "100%",
      }}
    >
      <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{
            margin: 'auto',
            maxWidth: 990,
            minHeight: window.innerHeight - 40,
          }}
      >
        <MUIDataTable
          title={"Classificação geral do modo história"}
          data={ranking}
          columns={columns}
          options={options}
        />
      </Grid>
      <BackUrl />
    </div>
  )
}