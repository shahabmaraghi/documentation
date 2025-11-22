export const sendBulkApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Send Group SMS API",
    version: "1.0.0",
    description: "از این متد برای ارسال پیامک گروهی به گیرندگان مختلف استفاده می شود. به این صورت که شماره فرستنده و متن پیام فقط یک شماره می تواند باشد و نیازی نیست به ازای هر گیرنده، یک شماره فرستنده وارد گردد."
  },
  servers: [
    {
      url: "https://gateway.ghasedak.me/rest/api/v1",
      description: "Production server"
    }
  ],
  paths: {
    "/WebService/SendBulkSMS": {
      post: {
        summary: "ارسال پیامک گروهی",
        description: "ارسال پیامک گروهی به گیرندگان مختلف با یک شماره فرستنده و یک متن پیام",
        operationId: "sendBulkSMS",
        tags: ["Group SMS"],
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["receptors", "message"],
                properties: {
                  sendDate: {
                    type: "string",
                    format: "date-time",
                    description: "تاریخ و زمان دقیق ارسال پیام که اگر قید نشود در همان لحظه پیام ارسال می شود.",
                    example: "2024-07-03T11:56:28.720Z"
                  },
                  lineNumber: {
                    type: "string",
                    description: "شماره فرستنده پیام می باشد، که اگر قید نشود از بین خطوط اختصاصی شما خط با اولویت بالاتر انتخاب می شود.",
                    example: "21*******"
                  },
                  receptors: {
                    type: "array",
                    description: "شماره گیرنده‌های پیام می‌باشد.",
                    items: {
                      type: "string"
                    },
                    example: ["0939*******", "0996*******"]
                  },
                  message: {
                    type: "string",
                    description: "متنی که باید ارسال شود.",
                    example: "ارسال پیام گروهی از وب سرویس قاصدک"
                  },
                  clientReferenceId: {
                    type: "string",
                    description: "برای تعیین شماره‌ای یکتا از طرف کاربر برای هر پیامک به کار می‌رود و پس از ارسال پیامک می‌توان با متد status کلیه اطلاعات پیام ارسال شده را دریافت کرد.",
                    example: "1"
                  },
                  isVoice: {
                    type: "boolean",
                    description: "صوتی بودن یا نبودن پیام را مشخص می‌کند.",
                    example: false
                  },
                  udh: {
                    type: "boolean",
                    description: "برای تعیین نوع ارسال پیام‌ها که می‌تواند 16 یا 8 بیتی باشد و اگر مقدار true پاس داده شود پیام 16 بیتی و اگر مقدار false داده شود پیام 8 بیتی ارسال خواهد شد. این پارامتر فقط برای پیش شماره 9000 اعمال می‌شود.",
                    example: false
                  }
                },
                example: {
                  sendDate: "2024-07-03T11:56:28.720Z",
                  lineNumber: "21*******",
                  receptors: ["0939*******", "0996*******"],
                  message: "ارسال پیام گروهی از وب سرویس قاصدک",
                  clientReferenceId: "1",
                  isVoice: false,
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
  'https://gateway.ghasedak.me/rest/api/v1/WebService/SendBulkSMS' \
  -H 'Content-Type: application/json' \
  -H 'ApiKey: "your-apiKey' \
  --data '{
    "sendDate": "2024-07-03T11:56:28.720Z",
    "lineNumber": "21*******",
    "receptors": [
      "0939*******","0996*******"
    ],
    "message": "ارسال پیام گروهی از وب سرویس قاصدک",
    "clientReferenceId": "1",
    "isVoice": false,
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

public class BulkSmsRequest
{
    public string SendDate { get; set; }
    public string LineNumber { get; set; }
    public string[] Receptors { get; set; }
    public string Message { get; set; }
    public string ClientReferenceId { get; set; }
    public bool IsVoice { get; set; }
    public bool Udh { get; set; }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("ApiKey", "your-apiKey");
        var request = new HttpRequestMessage(HttpMethod.Post, "https://gateway.ghasedak.me/rest/api/v1/WebService/SendBulkSMS");

        var bulkSmsRequest = new BulkSmsRequest
        {
            SendDate = "2024-07-03T11:56:28.720Z",
            LineNumber = "21*******",
            Receptors = new[] { "0939*******", "0996*******" },
            Message = "ارسال پیام گروهی از وب سرویس قاصدک",
            ClientReferenceId = "1",
            IsVoice = false,
            Udh = false
        };

        var json = JsonConvert.SerializeObject(bulkSmsRequest);
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
  CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendBulkSMS',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "sendDate": "2024-07-03T11:56:28.720Z",
  "lineNumber": "21*******",
  "receptors": [
    "0939*******",
    "0996*******"
  ],
  "message": "ارسال پیام گروهی از وب سرویس قاصدک",
  "clientReferenceId": "1",
  "isVoice": false,
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

class BulkSmsRequest {
    private String sendDate;
    private String lineNumber;
    private String[] receptors;
    private String message;
    private String clientReferenceId;
    private boolean isVoice;
    private boolean udh;

    public BulkSmsRequest(String sendDate, String lineNumber, String[] receptors, String message, String clientReferenceId, boolean isVoice, boolean udh) {
        this.sendDate = sendDate;
        this.lineNumber = lineNumber;
        this.receptors = receptors;
        this.message = message;
        this.clientReferenceId = clientReferenceId;
        this.isVoice = isVoice;
        this.udh = udh;
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient();

        BulkSmsRequest bulkSmsRequest = new BulkSmsRequest(
                "2024-07-03T11:56:28.720Z",
                "21*******",
                new String[]{"0939*******", "0996*******"},
                "ارسال پیام گروهی از وب سرویس قاصدک",
                "1",
                false,
                false
        );

        Gson gson = new Gson();
        String json = gson.toJson(bulkSmsRequest);

        RequestBody body = RequestBody.create(json, MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url("https://gateway.ghasedak.me/rest/api/v1/WebService/SendBulkSMS")
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
  url: 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendBulkSMS',
  headers: {
    'Content-Type': 'application/json',
    'ApiKey: "your-apiKey'
  },
  body: JSON.stringify({
    "sendDate": "2024-07-03T11:56:28.720Z",
    "lineNumber": "21*******",
    "receptors": [
      "0939*******",
      "0996*******"
    ],
    "message": "ارسال پیام گروهی از وب سرویس قاصدک",
    "clientReferenceId": "1",
    "isVoice": false,
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

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendBulkSMS"

payload = json.dumps({
  "sendDate": "2024-07-03T11:56:28.720Z",
  "lineNumber": "21*******",
  "receptors": [
    "0939*******",
    "0996*******"
  ],
  "message": "ارسال پیام گروهی از وب سرویس قاصدک",
  "clientReferenceId": "1",
  "isVoice": False,
  "udh": False
})
headers = {
  'Content-Type': 'application/json',
  'ApiKey: "your-apiKey'
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

type BulkSmsRequest struct {
	SendDate         string   \`json:"sendDate"\`
	LineNumber       string   \`json:"lineNumber"\`
	Receptors        []string \`json:"receptors"\`
	Message          string   \`json:"message"\`
	ClientReferenceId string  \`json:"clientReferenceId"\`
	IsVoice          bool     \`json:"isVoice"\`
	Udh              bool     \`json:"udh"\`
}

func main() {
	url := "https://gateway.ghasedak.me/rest/api/v1/WebService/SendBulkSMS"

	bulkSmsRequest := BulkSmsRequest{
		SendDate:         "2024-07-03T11:56:28.720Z",
		LineNumber:       "21*******",
		Receptors:        []string{"0939*******", "0996*******"},
		Message:          "ارسال پیام گروهی از وب سرویس قاصدک",
		ClientReferenceId: "1",
		IsVoice:          false,
		Udh:              false,
	}

	jsonData, err := json.Marshal(bulkSmsRequest)
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
                        cost: {
                          type: "integer",
                          description: "هزینه ارسال پیام",
                          example: 3537
                        },
                        lineNumber: {
                          type: "string",
                          description: "شماره خطی که پیام را ارسال می‌کند",
                          example: "21*******"
                        },
                        receptors: {
                          type: "array",
                          description: "لیست گیرندگان و شناسه پیام‌های ارسال شده",
                          items: {
                            type: "object",
                            properties: {
                              receptor: {
                                type: "string",
                                description: "شماره گیرنده",
                                example: "0939*******"
                              },
                              messageId: {
                                type: "string",
                                description: "شناسه پیام ارسالی به گیرنده",
                                example: "4248"
                              }
                            }
                          }
                        },
                        message: {
                          type: "string",
                          description: "متن پیام",
                          example: "test dotnet package bulk"
                        },
                        sendDate: {
                          type: "string",
                          format: "date-time",
                          description: "زمان و تاریخ ارسال پیام",
                          example: "2024-07-09T14:01:36.6632614+03:30"
                        }
                      }
                    }
                  },
                  example: {
                    isSuccess: true,
                    statusCode: 200,
                    message: "با موفقیت انجام شد",
                    data: {
                      cost: 3537,
                      lineNumber: "21*******",
                      receptors: [
                        {
                          receptor: "0939*******",
                          messageId: "4248"
                        },
                        {
                          receptor: "0996*******",
                          messageId: "4249"
                        }
                      ],
                      message: "test dotnet package bulk",
                      sendDate: "2024-07-09T14:01:36.6632614+03:30"
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

