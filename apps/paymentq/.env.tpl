{{ with secret "secrets/data/sehatq/frontend/paymentq/ENVIRONMENT" }}
{{- range $key, $value := .Data.data -}}
{{ $key }}="{{$value}}"
{{ end -}}
{{ end -}}
