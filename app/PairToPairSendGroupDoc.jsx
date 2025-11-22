import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import SyntaxHighlighter from 'react-syntax-highlighter';
import monokai from 'react-syntax-highlighter/src/styles/hljs/monokai';
import Iconify from '../../../../components/Iconify';
import { useTheme } from '@emotion/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import CustomContainer from '../../../../components/CustomContainer';
import CustomCard from '../../../../components/CustomCard';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import EndPointCards from '../../../../sections/@dashboard/developers/RestDocs/EndPointCards';
import Scrollbar from '../../../../components/Scrollbar';
import useTabs from '../../../../hooks/useTabs';
import TableHeaderActionButton from '../../../../components/TableHeaderActionButton';
import PageHeader from '../../../../components/PageHeader';
import { useNavigate } from 'react-router';
import DocCustomTable from '../../../../sections/@dashboard/developers/RestDocs/DocCustomTable';
import TabImage from '../components/TabImage';
const PairToPairSendGroupDoc = ({ endPoint, method }) => {
  const { currentTab, onChangeTab, setCurrentTab } = useTabs('curl');
  const navigate = useNavigate();
  const themes = useTheme();
  const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
  }));
  const programms = [
    {
      id: 'curl',
      details: [
        {
          type: 'code',
          message: `curl -X 'POST' \
  'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS' \
  -H 'ApiKey: your-ApiKey' \
  -H 'Content-Type: application/json' \
  --data '{
    "items": [
      {
        "lineNumber": "21*******",
        "receptor": "0937*****",
        "message": "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
        "clientReferenceId": "1",
        "sendDate": "2024-07-20T07:18:57.128Z"
      },
       {
        "lineNumber": "21*******",
        "receptor": "0912*****",
        "message": "ارسال پیام دوم نظیر به نظیر از وب سرویس قاصدک",
        "clientReferenceId": "2",
        "sendDate": "2024-07-20T07:18:57.128Z"
      }
    ],
    "udh": false
  }'`,
        },
      ],
    },
    {
      id: 'C#',
      details: [
        {
          type: 'code',
          message: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;

public class SmsItem
{
    public string LineNumber { get; set; }
    public string Receptor { get; set; }
    public string Message { get; set; }
    public string ClientReferenceId { get; set; }
    public string SendDate { get; set; }
}

public class PairToPairSmsRequest
{
    public List<SmsItem> Items { get; set; }
    public bool Udh { get; set; }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("ApiKey", "your-apiKey");
        var request = new HttpRequestMessage(HttpMethod.Post, "https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS");

        var smsItem = new SmsItem
        {
            LineNumber = "string",
            Receptor = "string",
            Message = "string",
            ClientReferenceId = "string",
            SendDate = "2024-07-03T13:07:58.793Z"
        };

        var pairToPairSmsRequest = new PairToPairSmsRequest
        {
            Items = new List<SmsItem> { smsItem },
            Udh = true
        };

        var json = JsonConvert.SerializeObject(pairToPairSmsRequest);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        request.Content = content;

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
`,
        },
      ],
    },
    {
      id: 'php',
      details: [
        {
          type: 'code',
          message: `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "items": [
    {
      "lineNumber": "21*******",
      "receptor": "string",
      "message": "string",
      "clientReferenceId": "string",
      "sendDate": "2024-07-03T13:07:58.793Z"
    }
  ],
  "udh": true
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'ApiKey: "your-apiKey'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;`,
        },
      ],
    },
    {
      id: 'java',
      details: [
        {
          type: 'code',
          message: `import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class SmsItem {
    private String lineNumber;
    private String receptor;
    private String message;
    private String clientReferenceId;
    private String sendDate;

    public SmsItem(String lineNumber, String receptor, String message, String clientReferenceId, String sendDate) {
        this.lineNumber = lineNumber;
        this.receptor = receptor;
        this.message = message;
        this.clientReferenceId = clientReferenceId;
        this.sendDate = sendDate;
    }

    // Getters and setters can be added if needed
}

class PairToPairSmsRequest {
    private List<SmsItem> items;
    private boolean udh;

    public PairToPairSmsRequest(List<SmsItem> items, boolean udh) {
        this.items = items;
        this.udh = udh;
    }

    // Getters and setters can be added if needed
}

public class Main {
    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient();

        SmsItem smsItem = new SmsItem(
                "string",
                "string",
                "string",
                "string",
                "2024-07-03T13:07:58.793Z"
        );

        List<SmsItem> items = new ArrayList<>();
        items.add(smsItem);

        PairToPairSmsRequest pairToPairSmsRequest = new PairToPairSmsRequest(items, true);

        Gson gson = new Gson();
        String json = gson.toJson(pairToPairSmsRequest);

        RequestBody body = RequestBody.create(json, MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url("https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("ApiKey", "your-apiKey")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            System.out.println(response.body().string());
        }
    }
}
`,
        },
      ],
    },

    {
      id: 'nodeJs',
      details: [
        {
          type: 'code',
          message: `var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "items": [
      {
        "lineNumber": "21*******",
        "receptor": "string",
        "message": "string",
        "clientReferenceId": "string",
        "sendDate": "2024-07-03T13:07:58.793Z"
      }
    ],
    "udh": true
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
`,
        },
      ],
    },
    {
      id: 'python',
      details: [
        {
          type: 'code',
          message: `import requests
import json

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS"

payload = json.dumps({
  "items": [
    {
      "lineNumber": "21*******",
      "receptor": "string",
      "message": "string",
      "clientReferenceId": "string",
      "sendDate": "2024-07-03T13:07:58.793Z"
    }
  ],
  "udh": True
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)`,
        },
      ],
    },
    {
      id: 'go',
      details: [
        {
          type: 'code',
          message: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
)

// SmsItem represents a single SMS item in the pair-to-pair SMS request
type SmsItem struct {
	LineNumber       string 'json:"lineNumber"'
	Receptor         string 'json:"receptor"'
	Message          string 'json:"message"'
	ClientReferenceId string 'json:"clientReferenceId"'
	SendDate         string 'json:"sendDate"'
}

// PairToPairSmsRequest represents the JSON structure for the pair-to-pair SMS request
type PairToPairSmsRequest struct {
	Items []SmsItem 'json:"items"'
	Udh   bool      'json:"udh"'
}

func main() {
	url := "https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS"

	// Create an instance of SmsItem with the necessary data
	smsItem := SmsItem{
		LineNumber:       "string",
		Receptor:         "string",
		Message:          "string",
		ClientReferenceId: "string",
		SendDate:         "2024-07-03T13:07:58.793Z",
	}

	// Create an instance of PairToPairSmsRequest with the necessary data
	pairToPairSmsRequest := PairToPairSmsRequest{
		Items: []SmsItem{smsItem},
		Udh:   true,
	}

	// Convert PairToPairSmsRequest to JSON
	jsonData, err := json.Marshal(pairToPairSmsRequest)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	// Create a new HTTP request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("ApiKey", "your-apiKey")

	// Send the request
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer res.Body.Close()

	// Read the response
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}
	fmt.Println(string(body))
}
`,
        },
      ],
    },
  ];

  const TABS = [
    {
      value: 'curl',
      image: '/images/curl.png',
    },
    {
      value: 'C#',
      image: '/images/c.svg',
    },
    {
      value: 'php',
      image: '/images/php.svg',
    },
    {
      value: 'java',
      image: '/images/java.svg',
    },
    {
      value: 'nodeJs',
      image: '/images/nodejs2.png',
    },
    {
      value: 'python',
      image: '/images/python.svg',
    },
    {
      value: 'go',
      image: '/images/go.png',
    },
  ];
 const outputRows = [
    { parameter: 'isSuccess', description: 'وضعیت پاسخ وب سرویس' },
    { parameter: 'statusCode', description: 'کد وضعیت' },
    { parameter: 'message', description: 'پیام وضعیت وب سرویس' },
    { parameter: 'receptor', description: 'شماره گیرنده' },
    { parameter: 'LineNumber', description: 'شماره خطی که پیام را ارسال می کند' },
    { parameter: 'Cost', description: 'هزینه ارسال پیام' },
    { parameter: 'MessageId', description: 'شناسه پیام' },
    { parameter: 'Message', description: 'متن پیام' },
    { parameter: 'SendDate', description: 'زمان و تاریح ارسال پیام' },
  ];
  const outputColumns = [
    { name: 'parameter', label: 'پارامتر' },
    { name: 'description', label: 'توضیح' },
  ];
  const inputRows = [
    {
      parameter: 'ApiKey',
      type: (
        <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>
          string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span>
        </Typography>
      ),
      description: 'کلید شناسه',
      method: 'Header',
    },
    {
      parameter: 'lineNumber',
      type: (
        <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>
          string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span>
        </Typography>
      ),
      description: 'شماره فرستنده پیام می باشد.',
      method: 'JSON body',
    },
    {
      parameter: 'receptor',
      type: (
        <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>
          string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span>
        </Typography>
      ),
      description: 'شماره گیرنده پیام می باشد.',
      method: 'JSON body',
    },
    {
      parameter: 'message',
      type: (
        <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>
          string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span>
        </Typography>
      ),
      description: 'متنی که باید ارسال شود.',
      method: 'JSON body',
    },
    {
      parameter: 'clientReferenceId',
      type: (
        <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>
          string 
        </Typography>
      ),
      description: "برای تعیین شماره ای یکتا از طرف کاربر برای هر پیامک به کار می رود و پس از ارسال پیامک می توان با متد staus کلیه اطلاعات پیام ارسال شده را دریافت کرد.",
      method: 'JSON body',
    },
    {
      parameter: 'sendDate',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string ,date-time</Typography>,
      description: "   تاریخ و زمان دقیق ارسال پیام که اگر قید نشود در همان لحظه پیام ارسال می شود .",
      method: 'JSON body',
    },
    {
      parameter: 'udh',
      type: <Typography sx={{ fontSize: '14px' }}>boolean</Typography>,
      description:"  برای تعیین نوع ارسال پیام ها که می تواند 16 یا 8 بیتی باشد و اگر مقدار true پاس داده شود پیام 16 بیتی و اگر مقدار flase داده شود پیام 8 بیتی ارسال خواهد شد همچنین این پارامتر فقط برای پیش شماره 9000 کاربرد دارد.",
      method: 'JSON body',
    },
  ];
  const  inputColumns = [
    { name: 'parameter', label: 'پارامتر' },
    { name: 'type', label: 'نوع' },
    { name: 'description', label: 'توضیح' },
    { name: 'method', label: 'روش ارسال پارامتر' },
  ];
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <Page title={'ارسال گروهی نظیر به نظیر'}>
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'راهنمای وب سرویس REST', href: PATH_DASHBOARD.developers.restDocs },
          { name: 'ارسال گروهی نظیر به نظیر' },
        ]}
      />
      <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
        <CustomCard>
          <PageHeader title={'ارسال گروهی نظیر به نظیر'} actions={<></>} />
          <Typography sx={{ mb: 6 }}>
            از این متد برای ارسال پیامک به صورت گروهی با متون مختلف و شماره فرستندگان و گیرندگان مختلف استفاده می شود.
          </Typography>
          <EndPointCards
            endPoint={'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS'}
            method={'POST'}
          />
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>پارامتر های ورودی</Typography>
          <DocCustomTable columns={inputColumns} rows={inputRows} />
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>پارامتر های خروجی</Typography>

          <DocCustomTable columns={outputColumns} rows={outputRows} />
          <Typography sx={{ mt: 6, fontSize: '16px', fontWeight: 'bold' }}> جدول خطاها</Typography>
          <Typography sx={{ mt: 1, fontSize: '16px' }}>
            چنانچه درخواست‌های ارسالی شما با خطای خاصی مواجه شد، برای آگاهی از دلایل آن می‌توانید از{' '}
            <a
              style={{ cursor: 'pointer', color: theme.palette.primary.light }}
              onClick={() => navigate(PATH_DASHBOARD.developers.errorTable)}
            >
              جدول خطاها
            </a>{' '}
            کمک بگیرید.
          </Typography>
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>نمونه درخواست</Typography>
          <Stack sx={{ paddingY: 5 }}>
            <SyntaxHighlighter
              customStyle={{
                textAlign: 'left',
                direction: 'ltr',
                borderRadius: 7,
                padding: '20px',
                fontSize: '13px',
              }}
              language={'bash'}
              style={monokai}
            >
              {`{
  "items": [
    {
      "lineNumber": "21*******",
      "receptor": "091********",
      "message": "test ghasedek",
      "clientReferenceId": "1",
      "sendDate": "2024-07-03T13:07:58.793Z"
    },
       {
      "lineNumber": "21*******",
      "receptor": "093********",
      "message": "test ghasedek",
      "clientReferenceId": "2",
      "sendDate": "2024-07-03T13:07:58.793Z"
    }
  ],
  "udh": false
}`}
            </SyntaxHighlighter>
          </Stack>
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>نمونه پاسخ</Typography>
          <Stack sx={{ paddingY: 5 }}>
            <SyntaxHighlighter
              customStyle={{
                textAlign: 'left',
                direction: 'ltr',
                borderRadius: 7,
                padding: '20px',
                fontSize: '13px',
              }}
              language={'bash'}
              style={monokai}
            >
              {`{
  "isSuccess": true,
  "statusCode": 200,
  "message": "string",
  "data": {
    "items": [
      {
        "lineNumber": "21*******",
        "receptor": "091********",
        "messageId": "4249",
        "cost": 1732,
        "sendDate": "2024-07-03T13:09:03.465Z",
        "message": "test ghasedak",
      },
      {
        "lineNumber": "21*******",
        "receptor": "093********",
        "messageId": "4250",
        "cost": 1732,
        "sendDate": "2024-07-03T13:09:03.465Z",
        "message": "test ghasedak",
      }
    ]
  }
}`}
            </SyntaxHighlighter>
          </Stack>
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>نمونه کد </Typography>

          <Scrollbar>
          <Box sx={{ display: 'flex', marginBottom: 3, gap: 2 }}>
  {TABS.map((tab) => (
        <TabImage
        key={tab.value}
        src={tab.image}
        alt={`${tab.value} icon`}
        isActive={currentTab === tab.value}
        onClick={() => setCurrentTab(tab.value)}
      />
  ))}
</Box>
          </Scrollbar>
          {programms
            ?.filter((item) => item?.id === currentTab)[0]
            ?.details?.map((item) => {
              return (
                <Stack sx={{ paddingY: 1.5 }}>
                  {currentTab === 'curl' ? (
                    <pre
                      style={{
                        textAlign: 'left',
                        direction: 'ltr',
                        borderRadius: 7,
                        padding: '35px',
                        fontSize: '13px',
                        color: 'rgb(221, 221, 221)',
                        backgroundColor: 'rgb(39, 40, 34)',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                      }}
                    >
                      {item?.message}
                    </pre>
                  ) : (
                    <SyntaxHighlighter
                      customStyle={{
                        textAlign: 'left',
                        direction: 'ltr',
                        borderRadius: 7,
                        padding: '35px',
                        fontSize: '13px',
                      }}
                      language={currentTab}
                      style={monokai}
                    >
                      {item?.message}
                    </SyntaxHighlighter>
                  )}
                </Stack>
              );
            })}
        </CustomCard>
      </CustomContainer>
    </Page>
  );
};

export default PairToPairSendGroupDoc;
