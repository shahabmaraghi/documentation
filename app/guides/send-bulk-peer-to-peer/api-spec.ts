export const sendGroupSmsPeerToPeerApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Send Group SMS Peer to Peer API",
    version: "1.0.0",
    description: "از این متد برای ارسال پیامک به صورت گروهی با متون مختلف و شماره فرستندگان و گیرندگان مختلف استفاده می‌شود."
  },
  servers: [
    {
      url: "https://gateway.ghasedak.me/rest/api/v1",
      description: "Production server"
    }
  ],
  paths: {
    "/WebService/SendPairToPairSMS": {
      post: {
        summary: "",
        description: "",
        operationId: "sendPairToPairSMS",
        tags: ["Peer to Peer SMS"],
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        parameters: [
          {
            name: "ApiKey",
            in: "header",
            required: true,
            description: "کلید احراز هویت دریافت‌شده از داشبورد قاصدک.",
            schema: {
              type: "string"
            }
          },
          {
            name: "Content-Type",
            in: "header",
            required: true,
            description: "برای ارسال بدنه‌ی JSON مقدار باید application/json باشد.",
            schema: {
              type: "string",
              example: "application/json"
            }
          }
        ],
        requestBody: {
          required: true,
          in: "body",
          content: {
            "application/json": {
              schema: {
                title: "Body",
                type: "object",
                required: ["items"],
                properties: {
                  items: {
                    type: "array",
                    description: "لیست پیامک‌های نظیر به نظیر",
                    items: {
                      type: "object",
                      required: ["lineNumber", "receptor", "message"],
                      properties: {
                        lineNumber: {
                          type: "string",
                          description: "شماره فرستنده پیام",
                          example: "21*******"
                        },
                        receptor: {
                          type: "string",
                          description: "شماره گیرنده پیام",
                          example: "0937*******"
                        },
                        message: {
                          type: "string",
                          description: "متنی که باید ارسال شود",
                          example: "ارسال پیام نظیر به نظیر از وب سرویس قاصدک"
                        },
                        clientReferenceId: {
                          type: "string",
                          description: "برای تعیین شماره‌ای یکتا از طرف کاربر برای هر پیامک به کار می‌رود و پس از ارسال پیامک می‌توان با متد status کلیه اطلاعات پیام ارسال شده را دریافت کرد.",
                          example: "1"
                        },
                        sendDate: {
                          type: "string",
                          format: "date-time",
                          description: "تاریخ و زمان دقیق ارسال پیام که اگر قید نشود در همان لحظه پیام ارسال می‌شود.",
                          example: "2024-07-20T07:18:57.128Z"
                        }
                      }
                    }
                  },
                  udh: {
                    type: "boolean",
                    description: "برای تعیین نوع ارسال پیام‌ها که می‌تواند 16 یا 8 بیتی باشد و اگر مقدار true پاس داده شود پیام 16 بیتی و اگر مقدار false داده شود پیام 8 بیتی ارسال خواهد شد همچنین این پارامتر فقط برای پیش شماره 9000 کاربرد دارد.",
                    example: false
                  }
                },
                example: {
                  items: [
                    {
                      lineNumber: "21*******",
                      receptor: "0937*******",
                      message: "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
                      clientReferenceId: "1",
                      sendDate: "2024-07-20T07:18:57.128Z"
                    },
                    {
                      lineNumber: "21*******",
                      receptor: "0912*******",
                      message: "ارسال پیام دوم نظیر به نظیر از وب سرویس قاصدک",
                      clientReferenceId: "2",
                      sendDate: "2024-07-20T07:18:57.128Z"
                    }
                  ],
                  udh: false
                }
              }
            }
          }
        },
        "x-codeSamples": [
          {
            lang: "curl",
            label: "curl",
            source: `curl -X 'POST' \
  'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS' \
  -H 'accept: text/plain' \
  -H 'ApiKey: "your-apiKey' \
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
          {
            lang: "csharp",
            label: "C#",
            source: `using System;
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
            LineNumber = "21*******",
            Receptor = "0937*****",
            Message = "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
            ClientReferenceId = "1",
            SendDate = "2024-07-20T07:18:57.128Z"
        };

        var pairToPairSmsRequest = new PairToPairSmsRequest
        {
            Items = new List<SmsItem> { smsItem },
            Udh = false
        };

        var json = JsonConvert.SerializeObject(pairToPairSmsRequest);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        request.Content = content;

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}`,
          },
          {
            lang: "php",
            label: "PHP",
            source: `<?php

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
          {
            lang: "java",
            label: "Java",
            source: `import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;

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
}

class PairToPairSmsRequest {
    private List<SmsItem> items;
    private boolean udh;

    public PairToPairSmsRequest(List<SmsItem> items, boolean udh) {
        this.items = items;
        this.udh = udh;
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient();

        SmsItem firstItem = new SmsItem(
                "21*******",
                "0937*****",
                "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
                "1",
                "2024-07-20T07:18:57.128Z"
        );

        PairToPairSmsRequest pairToPairSmsRequest = new PairToPairSmsRequest(
                Arrays.asList(firstItem),
                false
        );

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
}`,
          },
          {
            lang: "javascript",
            label: "Node.js",
            source: `var request = require('request');
var options = {
  method: 'POST',
  url: 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS',
  headers: {
    'accept': 'text/plain',
    'ApiKey: "your-apiKey',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
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
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});`,
          },
          {
            lang: "python",
            label: "Python",
            source: `import requests
import json

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS"

payload = json.dumps({
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
  "udh": False
})
headers = {
  'accept': 'text/plain',
  'ApiKey: "your-apiKey',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)`,
          },
          {
            lang: "go",
            label: "Go",
            source: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
)

type SmsItem struct {
	LineNumber       string \`json:"lineNumber"\`
	Receptor         string \`json:"receptor"\`
	Message          string \`json:"message"\`
	ClientReferenceId string \`json:"clientReferenceId"\`
	SendDate         string \`json:"sendDate"\`
}

type PairToPairSmsRequest struct {
	Items []SmsItem \`json:"items"\`
	Udh   bool      \`json:"udh"\`
}

func main() {
	url := "https://gateway.ghasedak.me/rest/api/v1/WebService/SendPairToPairSMS"

	pairToPairSmsRequest := PairToPairSmsRequest{
		Items: []SmsItem{
			{
				LineNumber:       "21*******",
				Receptor:         "0937*****",
				Message:          "ارسال پیام نظیر به نظیر از وب سرویس قاصدک",
				ClientReferenceId: "1",
				SendDate:         "2024-07-20T07:18:57.128Z",
			},
			{
				LineNumber:       "21*******",
				Receptor:         "0912*****",
				Message:          "ارسال پیام دوم نظیر به نظیر از وب سرویس قاصدک",
				ClientReferenceId: "2",
				SendDate:         "2024-07-20T07:18:57.128Z",
			},
		},
		Udh: false,
	}

	jsonData, err := json.Marshal(pairToPairSmsRequest)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("ApiKey", "your-apiKey")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}
	fmt.Println(string(body))
}`,
          },
        ],
        responses: {
          "200": {
            description: "درخواست با موفقیت انجام شد",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isSuccess: {
                      type: "boolean",
                      description: "وضعیت پاسخ وب سرویس",
                      example: true
                    },
                    statusCode: {
                      type: "integer",
                      description: "کد وضعیت",
                      example: 200
                    },
                    message: {
                      type: "string",
                      description: "پیام وضعیت وب سرویس",
                      example: "با موفقیت انجام شد"
                    },
                    data: {
                      type: "object",
                      properties: {
                        items: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              lineNumber: {
                                type: "string",
                                description: "شماره خطی که پیام را ارسال می‌کند",
                                example: "21*******"
                              },
                              receptor: {
                                type: "string",
                                description: "شماره گیرنده",
                                example: "091********"
                              },
                              messageId: {
                                type: "string",
                                description: "شناسه پیام",
                                example: "4249"
                              },
                              cost: {
                                type: "integer",
                                description: "هزینه ارسال پیام",
                                example: 1732
                              },
                              sendDate: {
                                type: "string",
                                format: "date-time",
                                description: "زمان و تاریخ ارسال پیام",
                                example: "2024-07-03T13:09:03.465Z"
                              },
                              message: {
                                type: "string",
                                description: "متن پیام",
                                example: "test ghasedak"
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  example: {
                    isSuccess: true,
                    statusCode: 200,
                    message: "با موفقیت انجام شد",
                    data: {
                      items: [
                        {
                          lineNumber: "21*******",
                          receptor: "091********",
                          messageId: "4249",
                          cost: 1732,
                          sendDate: "2024-07-03T13:09:03.465Z",
                          message: "test ghasedak"
                        },
                        {
                          lineNumber: "21*******",
                          receptor: "093********",
                          messageId: "4250",
                          cost: 1732,
                          sendDate: "2024-07-03T13:09:03.465Z",
                          message: "test ghasedak"
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "ApiKey",
        description: "کلید شناسه (اجباری)"
      }
    }
  }
};

