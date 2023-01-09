        public Dictionary<string, decimal> ToDecimalDict(Dictionary<string, long> dict)
        {
            return dict.ToDictionary(k => k.Key, k => ((decimal)k.Value) / 100000000);
        }
